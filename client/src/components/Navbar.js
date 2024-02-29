import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import GlobaleCotext from '../Pages/GlobalContext'
import Cookies from 'universal-cookie';

function Navbar() {
    let state = useContext(GlobaleCotext)
    let [PlayerInfo] = state.PlayerInfo
    let [IsAdmin] = state.IsAdmin
    let [IsLogged] = state.IsLogged
    const [Active, setActive] = useState(false)
    const cookies = new Cookies();

    let logout = () => {
        cookies.set('accesstoken', '', { path: '/', expires: new Date(Date.now())})
        window.location.href = '/'
    }

    return (
        <nav className='navbar'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>

            {
                IsLogged && PlayerInfo &&
                <ul className={`${Active ? 'active' : ''}`}>
                    {
                        PlayerInfo && IsAdmin && <li><Link to={`/all_players`} onClick={() => setActive(() => !Active)}>كل اللاعبين</Link></li>
                    }
                    <li><Link to={`/player_info/${PlayerInfo._id}`} onClick={() => setActive(() => !Active)}>حسابي</Link></li>
                    <li><Link to={`/change_password`} onClick={() => setActive(() => !Active)}>تغيير كلمة المرور</Link></li>
                    <li><span style={{ color: '#fff' }} onClick={logout}>تسجيل الخروج</span></li>
                </ul>
            }

            {
                !IsLogged &&
                <ul className={`${Active ? 'active' : ''}`}>
                    <li><Link to={'/login'} onClick={() => setActive(() => !Active)}>تسجيل الدخول</Link></li>
                    <li><Link to={'/register'} onClick={() => setActive(() => !Active)}>انشاء حساب</Link></li>
                </ul>
            }

            <div className="burger" onClick={() => setActive(() => !Active)}>
                <span className={`bar0 ${Active ? 'active' : ''}`}></span>
                <span className={`bar1 ${Active ? 'active' : ''}`}></span>
            </div>
        </nav>
    )
}

export default Navbar