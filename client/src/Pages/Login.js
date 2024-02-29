import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

function Login() {
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)
    const cookies = new Cookies();
    
    const submitHandler = async e => {
        e.preventDefault()
        setSending(true)
        try {
            let res = await axios.post('http://localhost:5000/api/user/login', {
                name: Name,
                password: Password
            })
            cookies.set('accesstoken', res.data.accesstoken, { path: '/', expires: new Date(Date.now() + 86400000)});

            if(res.data) {
                window.location.href = '/player_details'
            }
        } catch (err) {
            console.log(err?.response?.data?.msg)
            setSending(false)
            setError(err?.response?.data?.msg)
        }
    }

    return (
        <div className="form_container">
            <img src={logo} alt="" />

            <form className="form" onSubmit={submitHandler}>
                <h1>تسجيل الدخول</h1>
                
                <div className="input_container">
                    <label htmlFor="">الاسم</label>
                    <input type="text" placeholder='' onChange={e => setName(e.target.value)} value={Name} />
                </div>

                <div className="input_container">
                    <label htmlFor="">كلمة المرور</label>
                    <input type="password" placeholder='' onChange={e => setPassword(e.target.value)} value={Password} />
                </div>
                
                <p style={{ color: "#ff4141" }}>{Error}</p>

                <input type="submit" value={Sending ? '...يتم تسجيل دخولك' : 'تسجيل الدخول'} />
                <p>ليس لدي اي حساب - <Link to="/register">انشاء حساب</Link></p>
            </form>
        </div>
    )
}

export default Login