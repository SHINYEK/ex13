import React from 'react'
import loading from '../images/loading.gif'
const LoadingPage = () => {
    const style={
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        background: '#ffffffb7',
        zIndex: '999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
    return (
        <div style={style}>
            <img src={loading} alt="로딩중" width="10%"/>
            <div>로딩중~!</div>
        </div>
    )
}

export default LoadingPage