import React, { useContext, useEffect, useState } from 'react'
import GlobaleCotext from './GlobalContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function PlayerDetailsAdmin() {
    let state = useContext(GlobaleCotext)
    let [AllPlayers] = state.AllPlayers
    let [CallBack, setCallBack] = state.CallBack
    let tokenCookie = state.tokenCookie
    let [PlayerInfo, setPlayerInfo] = useState({})

    let params = useParams()
    let navigate = useNavigate()

    let deletePlayer = async e => {
        e.preventDefault()
        try {
            let res = await axios.delete(`http://localhost:5000/api/player/${params.id}`, {
                headers: {
                    'Authorization': tokenCookie
                }
            })
            if(res.data) {
                setCallBack(!CallBack)
                navigate('/all_players')
            }
        } catch (err) {
            console.log(err?.response?.data?.msg);
        }
    }

    useEffect(() => {
        if(AllPlayers.length !== 0) {
            let player = AllPlayers.find(p => p._id === params.id)
            setPlayerInfo(player)
        }
    }, [AllPlayers, params])

    if(Object.keys(PlayerInfo).length === 0) return <h1>No data</h1>

    return (
        <div className="form_container pt0">
            <h1>معلوماتي</h1>
            <form className="form s">
                
                <div className="inputs">

                    <div className="input_container">
                        <label htmlFor="">UID</label>
                        <strong>{ PlayerInfo["UID"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">اسم اللاعب</label>
                        <strong>{ PlayerInfo["اسم_اللاعب"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الرماه المدرع</label>
                        <strong>{ PlayerInfo["عدد_الرماه_المدرع"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الثكنة المدرع</label>
                        <strong>{ PlayerInfo["عدد_الثكنة_المدرع"] }</strong>
                    </div>
                    
                    <div className="input_container">
                        <label htmlFor="">عدد الرماه الخارق</label>
                        <strong>{ PlayerInfo["عدد_الرماه_الخارق"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الثكنة الخارق</label>
                        <strong>{ PlayerInfo["عدد_الثكنة_الخارق"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">اسم القلعة</label>
                        <strong>{ PlayerInfo["اسم_القلعة"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">مستوى المارد</label>
                        <strong>{ PlayerInfo["مستوى_المارد"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">مستوى المقام</label>
                        <strong>{ PlayerInfo["مستوى_المقام"] }</strong>
                    </div>

                    <div className="input_container">
                        <label htmlFor="">قوة السلاح</label>
                        <strong>{ PlayerInfo["قوة_السلاح"] }</strong>
                    </div>
                </div>
                
                <Link to={`/update_player_info/${PlayerInfo?._id}`} className='btn'>تعديل المعلومات</Link>
                <button className='btn w100' onClick={deletePlayer} >حدف اللاعب</button>
            </form>
        </div>
    )
}

export default PlayerDetailsAdmin