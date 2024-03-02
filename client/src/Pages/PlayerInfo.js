import React, { useContext, useEffect, useState } from 'react'
import GlobaleCotext from './GlobalContext'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

function PlayerInfo() {
    let state = useContext(GlobaleCotext)
    let tokenCookie = state.tokenCookie
    let [PlayerInfo] = state.PlayerInfo
    let [CallBack, setCallBack] = state.CallBack
    const cookies = new Cookies();

    const [Attribute0, setAttribute0] = useState('')
    const [Attribute1, setAttribute1] = useState('')
    const [Attribute2, setAttribute2] = useState(0)
    const [Attribute3, setAttribute3] = useState(0)
    const [Attribute4, setAttribute4] = useState(0)
    const [Attribute5, setAttribute5] = useState(0)
    const [Attribute6, setAttribute6] = useState('')
    const [Attribute7, setAttribute7] = useState('')
    const [Attribute8, setAttribute8] = useState('')
    const [Attribute9, setAttribute9] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(PlayerInfo).length !== 0) {
            setAttribute0(PlayerInfo["UID"])
            setAttribute1(PlayerInfo["اسم_اللاعب"])
            setAttribute2(PlayerInfo["عدد_الرماه_المدرع"])
            setAttribute3(PlayerInfo["عدد_الثكنة_المدرع"])
            setAttribute4(PlayerInfo["عدد_الرماه_الخارق"])
            setAttribute5(PlayerInfo["عدد_الثكنة_الخارق"])
            setAttribute6(PlayerInfo["اسم_القلعة"])
            setAttribute7(PlayerInfo["مستوى_المارد"])
            setAttribute8(PlayerInfo["مستوى_المقام"])
            setAttribute9(PlayerInfo["قوة_السلاح"])
        }
    }, [PlayerInfo, params])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let res = await axios.put(`https://aborayan.cyclic.app/api/player/${params.id}`, {
                "UID": Attribute0,
                "اسم_اللاعب": Attribute1,
                "عدد_الرماه_المدرع": Attribute2,
                "عدد_الثكنة_المدرع": Attribute3,
                "عدد_الرماه_الخارق": Attribute4,
                "عدد_الثكنة_الخارق": Attribute5,
                "اسم_القلعة": Attribute6,
                "مستوى_المارد": Attribute7,
                "مستوى_المقام": Attribute8,
                "قوة_السلاح": Attribute9,
            }, {
                headers: {
                    "Authorization": tokenCookie
                }
            })

            if(res.data) {
                setCallBack(!CallBack)
                navigate('/player_details')
            }
        }
        catch(err) {
            console.log(err?.response?.data?.msg);
            if(err?.response?.data?.msg?.toLowerCase() === 'jwt expired') {
                window.alert('المرجوا اعادة تسجيل الدخول')
                window.location.href = '/login'
                cookies.remove('accesstoken', { path: '/' });
            }
        }
    }

    if(Object.keys(PlayerInfo).length === 0) return <h1>No data</h1>
    
    return (
        <div className="form_container pt0">
            <h1>تعديل البيانات</h1>
            <form className="form s" onSubmit={handleSubmit}>
                
                <div className="inputs">

                    <div className="input_container">
                        <label htmlFor="">UID</label>
                        <input type="text" placeholder='' onChange={e => setAttribute0(e.target.value)} value={Attribute0} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">اسم اللاعب</label>
                        <input type="text" placeholder='' onChange={e => setAttribute1(e.target.value)} value={Attribute1} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الرماه المدرع</label>
                        <input type="number" placeholder='' onChange={e => setAttribute2(e.target.value)} value={Attribute2} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الثكنة المدرع</label>
                        <input type="number" placeholder='' onChange={e => setAttribute3(e.target.value)} value={Attribute3} />
                    </div>
                    
                    <div className="input_container">
                        <label htmlFor="">عدد الرماه الخارق</label>
                        <input type="number" placeholder='' onChange={e => setAttribute4(e.target.value)} value={Attribute4} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">عدد الثكنة الخارق</label>
                        <input type="number" placeholder='' onChange={e => setAttribute5(e.target.value)} value={Attribute5} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">اسم القلعة</label>
                        <input type="text" placeholder='' onChange={e => setAttribute6(e.target.value)} value={Attribute6} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">مستوى المارد</label>
                        <input type="text" placeholder='' onChange={e => setAttribute7(e.target.value)} value={Attribute7} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">مستوى المقام</label>
                        <input type="text" placeholder='' onChange={e => setAttribute8(e.target.value)} value={Attribute8} />
                    </div>

                    <div className="input_container">
                        <label htmlFor="">قوة السلاح</label>
                        <input type="text" placeholder='' onChange={e => setAttribute9(e.target.value)} value={Attribute9} />
                    </div>
                </div>
                
                <input type="submit" value={"حفظ البيانات"} />
            </form>
        </div>
    )
}

export default PlayerInfo
