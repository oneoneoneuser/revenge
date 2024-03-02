import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Register() {
    
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)

    const submitHandler = async e => {
        e.preventDefault()
        setSending(true)
        try {
            let res = await axios.post('https://aborayan.cyclic.app/api/user/register', {
                name: Name,
                password: Password
            })
            
            if(res.data) {
                window.location.href = '/login'
            }
        } catch (err) {
            console.log(err?.response?.data?.msg);
            setSending(false)
            setError(err?.response?.data?.msg)
        }
    }

    return (
        <div className="form_container">
            <img src={logo} alt="" />

            <form className="form" onSubmit={submitHandler}>
                <h1>انشاء حساب</h1>
                
                <div className="input_container">
                    <label htmlFor="">الاسم</label>
                    <input type="text" placeholder='' onChange={e => setName(e.target.value)} value={Name} />
                </div>

                <div className="input_container">
                    <label htmlFor="">كلمة المرور</label>
                    <input type="password" placeholder='' onChange={e => setPassword(e.target.value)} value={Password} />
                </div>
                
                <p style={{ color: "#ff4141" }}>{Error}</p>

                <input type="submit" value={Sending ? '...يتم انشاء حسابك' : 'تسجيل الدخول'} />
                <p>لدي حساب - <Link to="/login">تسجيل الدخول</Link></p>
            </form>
        </div>
    )
}

export default Register
