import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../firebaseInit'
import { UserContext } from './UserContext'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
import {getStorage,uploadBytes,ref,getDownloadURL} from 'firebase/storage'

const MyPage = ({history}) => {
    const [loading,setLoading] = useState(false);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const email = sessionStorage.getItem('email');
    const {user,setUser} = useContext(UserContext);
    const [file,setFile] = useState(null);

    const [form,setForm] = useState({
        name:user.name,
        address:user.address,
        photo:user.photo
    })
    const {name,address,photo} = form;
    
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(!window.confirm("회원의 정보를 수정하시겠습니까?"))return;
        let url = '';
        if(file){
            const fileName = `images/${Date.now()}_${file.name}`;
            const result = await uploadBytes(ref(storage,fileName),file);
            url = await getDownloadURL(result.ref);
        } 
        await setDoc(doc(db,'users',email),{
            ...form,
            photo:url
        })
        setUser({...form,photo:url})
        setLoading(false);
        history.push('/');
    }

    const onFileChange = (e) =>{
        setForm({...form, photo:URL.createObjectURL(e.target.files[0])})
        setFile(e.target.files[0])
    }


  return (
    <Row className='justify-content-center m-3'>
        <Col xl={5}>
            <Card className='p-3'>
                <Card.Title className='text-center'>
                    <h1>마이페이지</h1>
                </Card.Title>
                <Card.Body>
                    <Form className='text-center' onSubmit={onSubmit}>
                        <Form.Control placeholder='이름' className='my-2' value={name} onChange={onChange}/>
                        <Form.Control placeholder='주소' className='my-2' value={address} onChange={onChange}/>
                        <img src={photo?photo:"https://via.placeholder.com/200X250"} style={{width:'200px'}}/>
                        <Form.Control type='file' className='my-2' onChange={onFileChange}/>
                        <Button type='submit' className='px-5'>정보수정</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default MyPage