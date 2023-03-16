import React, { useEffect, useState } from 'react'
import { app } from '../firebaseInit'
import { getFirestore, onSnapshot, query, collection, orderBy} from 'firebase/firestore'
import { Card, Col, Row } from 'react-bootstrap';
import LoadingPage from './LoadingPage';

const UsersPage = () => {
    const db = getFirestore(app);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = () => {
        setLoading(true);
        const q = query(collection(db, 'users'), orderBy('name'));
        onSnapshot(q, (result)=>{
            let rows=[];
            result.forEach((row)=>{
                rows.push(row.data());
            });
            //console.log(rows);
            setUsers(rows);
            setLoading(false);
        })
    }
    useEffect(()=>{
        getUsers();
    },[]);

    if(loading) return <LoadingPage></LoadingPage>
    return (
        <div>
            <h1>사용자목록</h1>
            <Row className='justify-content-center'>
                <Col xl={6}>
                    {users.map(user=>
                        <Card key={user.email} className="m-3 p-2">
                            <Row>
                                <Col xl={2}>
                                    <img src={user.photo?user.photo:'http://via.placeholder.com/120X150'} style={{width:'100px'}}/>
                                </Col>
                                <Col xl={10}>
                                    <h4 style={{paddingTop:'30px'}}>{user.name? user.name:'정보없음'} : {user.email}</h4>
                                    <div>{user.address?user.address:'정보없음'}</div>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default UsersPage