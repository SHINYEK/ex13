import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import './Chats.css'
import { UserContext } from './UserContext'
import {app} from '../firebaseInit'
import {getDatabase,ref,set,push,onValue,remove} from 'firebase/database'
import moment from 'moment'
import LoadingPage from './LoadingPage'

//firebase realtime db 사용


const ChatsPage = () => {
  const {user} = useContext(UserContext);
  const db = getDatabase(app);
  const ref_bottom = useRef(null);
  const [text,setText] = useState('');
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState([]);

  //메세지 읽어오는 함수
  const getMessage =() =>{
    setLoading(true);
      onValue(ref(db,'chats'),(result)=>{
        //result가 object라서 반복해서 넣어줘야 함
        let rows = [] ;
        result.forEach(row=>{
          rows.push(row.val());
        })
        console.log(rows);
        setMessage(rows);
        setLoading(false);
      })
  }

  useEffect(()=>{
    getMessage();
  },[message])

  const onSend = async(e) =>{
    e.preventDefault();
    if(text===""){
      alert("내용을 입력해주세요!");
      return;
    }
    //메세지 전송 함수(realtime db)
    //키 생성
    const key = push(ref(db,'chats/')).key;
    //전송할메세지
    const message = {
      key:key,
      email:user.email,
      name:user.name,
      photo:user.photo,
      text:text,
      date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    }
    await set(ref(db,`chats/${key}`),message);
    setText('');
    ref_bottom.current.scrollIntoView({behavior:'smooth'})
  }

  const onDelete = (e)=>{
    e.preventDefault();
    const key = e.target.getAttribute('href');
    if(!window.confirm(`${key}번 데이터를 삭제하실래요?`)) return;
    remove(ref(db,`chats/${key}`))
  }

  if(loading) return <LoadingPage></LoadingPage>

  return (
    <Row className='justify-content-center m-3 p-3'>
      <Col xl={8}>
        <Card>
          <Card.Title className='p-3'>
              <h1>Chatting💭</h1>
          </Card.Title>
          <Card.Body>
              <div className='wrap'>
                {message.map((msg)=>(
                  <div className={user.email===msg.email?'chat ch2':'chat ch1'}>
                    { msg.email === user.email ||
                      <div className='icon'>
                      <img src={msg.photo}/>
                      <div className='sender'>{user.name}</div>
                  </div>
                    }
                    
                    <div className='textbox'>
                      {msg.text}
                      {user.email === msg.email && <a href={msg.key} style={{float:'right', textDecoration:'none'}} onClick={onDelete}>❌</a>}
                      <br />
                      <span style={{fontSize:'10px'}}>{msg.date}</span>
                    </div>
                  </div>
                ))}
                <div ref={ref_bottom}/>
              </div>
              <Form onSubmit={onSend}>
                  <Form.Control placeholder='내용을 입력하세요....' value={text} onChange={(e)=>setText(e.target.value)}/>
              </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ChatsPage