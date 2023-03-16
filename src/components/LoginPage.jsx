import React, { useContext, useRef, useState } from 'react'
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { UserContext } from './UserContext'
import { getDoc, doc, getFirestore } from 'firebase/firestore'
import LoadingPage from './LoadingPage'
const LoginPage = ({history}) => {
    const db = getFirestore(app);
    const {user, setUser} = useContext(UserContext)
    const auth = getAuth(app);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email:'user01@email.com',
        password: '12341234'
    });

    const getUser = async() => {
        const result=await getDoc(doc(db, 'users', email));
        //console.log(result.data());
        setUser(result.data());
    }

    const {email, password} = form; 
    const onChange = (e) => {
        setForm({
            ...form, [e.target.name]:e.target.value
        })
    }
    const onLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            //getUser();
            setLoading(false);
            alert('성공!');
            sessionStorage.setItem('email', email)
            history.push('/');
        })
        .catch((error)=>{
            setLoading(false);
            alert(error.message);
        });
    }
    if(loading) return <LoadingPage></LoadingPage>
    return (
        <div>
            <Row className='justify-content-center m-5'>
                <Col l={5} md={5}>
                    <Card>
                        <Card.Title className='text-center my-2'>
                            <h3>Login</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form className='text-center' onSubmit={onLogin}>
                                <Form.Control name="email"
                                    value={email} onChange={onChange}
                                    placeholder='이메일' className='my-2'/>
                                <Form.Control name="password"
                                    value={password} onChange={onChange}
                                    placeholder='비밀번호' type="password" className='my-2'/>
                                <Button type="submit" className='px-5'>로그인</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage