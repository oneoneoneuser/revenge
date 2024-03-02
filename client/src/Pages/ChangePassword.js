import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import GlobaleCotext from './GlobalContext';

function ChangePassword() {
    let state = useContext(GlobaleCotext)
    let tokenCookie = state.tokenCookie
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')

    const submitHandler = async e => {
        e.preventDefault()
        try {
            let res = await axios.put('https://aborayan.cyclic.app/api/user/update_password', {
                password: Password
            }, {
                headers: {
                    "Authorization": tokenCookie
                }
            })

            if(res.data) {
                window.location.href = '/player_details'
            }
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.msg)
        }
    }

    return (
        <div className="form_container">
            <img src={logo} alt="" />

            <form className="form" onSubmit={submitHandler}>
                <h1>تغيير كلمة المرور</h1>

                <div className="input_container">
                    <label htmlFor="">كلمة المرور الجديدة</label>
                    <input type="text" placeholder='' onChange={e => setPassword(e.target.value)} value={Password} />
                </div>
                <p style={{ color: "#ff4141" }}>{Error}</p>
                
                <input type="submit" value={"تغيير كلمة المرور"} />
            </form>
        </div>
    )
}

export default ChangePassword