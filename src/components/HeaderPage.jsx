import React, { useContext, useEffect } from 'react'
import back from '../images/back.jpg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import { app } from '../firebaseInit'
import { getDoc, doc, getFirestore } from 'firebase/firestore'
import { ColorContext } from './ColorContext';
import { Button } from 'react-bootstrap';

const HeaderPage = ({history}) => {
    const db = getFirestore(app);
    const {user, setUser} = useContext(UserContext);
    const {color,setColor} = useContext(ColorContext);

    const email=sessionStorage.getItem('email');

    const onLogout = () => {
        sessionStorage.removeItem('email');
        setUser(null);
        history.push('/');
    }

    const getUser = async() => {
        const result=await getDoc(doc(db, 'users',email));
        setUser(result.data());
        console.log(result.data())
    }

    useEffect(()=>{
        getUser();
    }, [email]);

    return (
        <div className='header'>
            <img src={back} className="back" />
            <Navbar bg={color} variant="dark">
                <Container>
                    <Nav>
                        <Link to="/">Home</Link>
                        <Link to="/users">사용자목록</Link>
                        {user && <Link to="/chats">채팅</Link>}
                        {sessionStorage.getItem('email') ? 
                            <Link to="/logout" onClick={onLogout}>로그아웃</Link>:
                            <Link to="/login">로그인</Link>
                        }
                    </Nav>
                    <div>  
                        {(user && user.photo) && 
                            <img src={user.photo} style={{width:'50px', borderRadius:'50%'}}/>}
                        {(user && user.name) && 
                            <Link to="/mypage">{user.name}님</Link>
                        }
                      
                    </div>    
                </Container>
            </Navbar>
        </div>
    )
}

export default withRouter(HeaderPage)