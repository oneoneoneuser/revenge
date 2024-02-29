import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import PlayerInfo from './Pages/PlayerInfo'
import PlayerDetails from './Pages/PlayerDetails'
import UpdatePlayerInfo from './Pages/UpdatePlayerInfo'
import AllPlayers from './Pages/AllPlayers'
import GlobaleCotext from './Pages/GlobalContext'
import Navbar from './components/Navbar'
import ChangePassword from './Pages/ChangePassword'
import PlayerDetailsAdmin from './Pages/PlayerDetailsAdmin'

function Routers() {
    let state = useContext(GlobaleCotext)
    let [IsLogged] = state.IsLogged
    let [IsAdmin] = state.IsAdmin

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={ IsLogged ? <PlayerDetails /> : <Login /> } />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/player_info/:id' element={ IsLogged ? <PlayerInfo /> : <Login /> } />
                <Route path='/player_details' element={ IsLogged ? <PlayerDetails /> : <Login /> } />
                <Route path='/player_details_admin/:id' element={ (IsLogged && IsAdmin) ? <PlayerDetailsAdmin /> : <Login /> } />
                <Route path='/update_player_info/:id' element={IsLogged ? <UpdatePlayerInfo /> : <Login /> } />
                <Route path='/change_password' element={IsLogged ? <ChangePassword /> : <Login /> } />
                <Route path='/all_players' element={ (IsLogged && IsAdmin) ? <AllPlayers /> : (IsLogged && !IsAdmin) ? <PlayerDetails /> : <Login /> } />
            </Routes>
        </Router>
    )
}

export default Routers