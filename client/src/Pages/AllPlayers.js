import React, { useContext } from 'react'
import GlobaleCotext from './GlobalContext'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';

function AllPlayers() {
    let state = useContext(GlobaleCotext)
    let [AllPlayers] = state.AllPlayers
    let [SortBy, setSortBy] = state.SortBy

    let download_data = () => {

        return AllPlayers.map(player => {
            return {
                "UID": player["UID"],
                "اسم_اللاعب": player["اسم_اللاعب"],
                "عدد_الرماه_المدرع": player["عدد_الرماه_المدرع"],
                "عدد_الثكنة_المدرع": player["عدد_الثكنة_المدرع"],
                "عدد_الرماه_الخارق": player["عدد_الرماه_الخارق"],
                "عدد_الثكنة_الخارق": player["عدد_الثكنة_الخارق"],
                "اسم_القلعة": player["اسم_القلعة"],
                "مستوى_المارد": player["مستوى_المارد"],
                "مستوى_المقام": player["مستوى_المقام"],
            }
        })
    }

    if(AllPlayers.length === 0) return <h1>No Data</h1>

    return (
        <div className="form_container pt0">
            <h1>معلومات اللاعبين</h1>

            <div className='sort_container'>        
                <span>ترتيب حسب</span>
                <select onChange={e => setSortBy(e.target.value)} value={SortBy} className='btn'>
                    <option value={'عدد_الرماه_المدرع'}>عدد_الرماه_المدرع</option>
                    <option value={'عدد_الثكنة_المدرع'}>عدد_الثكنة_المدرع</option>
                    <option value={'عدد_الرماه_الخارق'}>عدد_الرماه_الخارق</option>
                    <option value={'عدد_الثكنة_الخارق'}>عدد_الثكنة_الخارق</option>
                </select>
            </div>
            <CSVLink
                data={download_data()}

                filename={`انتقام_السلاطين_${new Date()}`}
                style={{ "textDecoration": "none" }}
                className='btn'
            >
                تحميل بيانت اللاعبين
            </CSVLink>
            
            <div className="table_container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>تعديل</th>
                            <th>تفاصيل</th>
                            <th>UID</th>
                            <th>اسم اللاعب</th>
                            <th>عدد الرماه المدرع</th>
                            <th>عدد الثكنة المدرع</th>
                            <th>عدد الرماه الخارق</th>
                            <th>عدد الثكنة الخارق</th>
                            <th>اسم القلعة</th>
                            <th>مستوى المارد</th>
                            <th>مستوى المقام</th>
                            <th>قوة الاسلاح</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            AllPlayers.map(player => {
                                return (
                                    <tr key={player._id}>
                                        <td>
                                            <Link to={`/update_player_info/${player._id}`}>تعديل</Link>
                                        </td>
                                        <td>
                                            <Link to={`/player_details_admin/${player._id}`}>تفاصيل</Link>
                                        </td>
                                        
                                        <td>{ player["UID"]?.length > 0 ? player["UID"] : '-' }</td>
                                        <td>{ player["اسم_اللاعب"]?.length > 0 ? player["اسم_اللاعب"] : '-' }</td>
                                        <td>{ player["عدد_الرماه_المدرع"]?.toString()?.length > 0 ? player["عدد_الرماه_المدرع"] : '-' }</td>
                                        <td>{ player["عدد_الثكنة_المدرع"]?.toString()?.length > 0 ? player["عدد_الثكنة_المدرع"] : '-' }</td>
                                        <td>{ player["عدد_الرماه_الخارق"]?.toString()?.length > 0 ? player["عدد_الرماه_الخارق"] : '-' }</td>
                                        <td>{ player["عدد_الثكنة_الخارق"]?.toString()?.length > 0 ? player["عدد_الثكنة_الخارق"] : '-' }</td>
                                        <td>{ player["اسم_القلعة"]?.length > 0 ? player["اسم_القلعة"] : '-' }</td>
                                        <td>{ player["مستوى_المارد"]?.length > 0 ? player["مستوى_المارد"] : '-' }</td>
                                        <td>{ player["مستوى_المقام"]?.length > 0 ? player["مستوى_المقام"] : '-' }</td>
                                        <td>{ player["قوة_السلاح"]?.length > 0 ? player["قوة_السلاح"] : '-' }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllPlayers