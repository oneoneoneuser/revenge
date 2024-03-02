import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'

export const GlobaleCotext = createContext()

export const DataProvider = ({ children }) => {
    const [IsLogged, setIsLogged] = useState(false)
    const [IsAdmin, setIsAdmin] = useState(false)
    const [PlayerInfo, setPlayerInfo] = useState({})
    const [AllPlayers, setAllPlayers] = useState([])
    const [SortBy, setSortBy] = useState('عدد_الرماه_المدرع')
    const [CallBack, setCallBack] = useState(false)
    const cookies = new Cookies();

    const tokenCookie = cookies.get('accesstoken');
    
    const CheckIfAdmin = async () => {
        try {
            let res = await axios.get('https://aborayan.cyclic.app/api/user/userinfo', {
                headers: { "Authorization": tokenCookie }
            })
            
            if(res.data.user.isAdmin) {
                return setIsAdmin(res.data.user.isAdmin)
            }
        } catch (err) {
            console.log(err?.response);
        }
    }

    const getPlayerInfo = async () => {
        try {
            let res = await axios.get('https://aborayan.cyclic.app/api/player/playerinfo', {
                headers: { "Authorization": tokenCookie }
            })
            
            if(res.data.data) {
                setPlayerInfo(res.data.data)
            }
        } catch (err) {
            console.log(err?.response?.data?.msg);
        }
    }

    const getAllPlayers = async () => {
        try {
            let res = await axios.get('https://aborayan.cyclic.app/api/player/', {
                headers: { "Authorization": tokenCookie }
            })
            
            let all_players = []
            let sort = localStorage.getItem('sort_by')

            if(sort) {
                all_players = res.data.data.sort((a, b) => b[sort] - a[sort])
            }
            else {
                all_players = res.data.data.sort((a, b) => b[SortBy] - a[SortBy])
            }
            setAllPlayers(all_players)
        } catch (err) {
            console.log(err?.response?.data?.msg);
        }
    }

    useEffect(() => {
        if(tokenCookie) {
            setIsLogged(true)
            CheckIfAdmin()
            getPlayerInfo()
        }
    }, [])

    useEffect(() => {
        if(tokenCookie) {
            getPlayerInfo()
            getAllPlayers()
        }
    }, [CallBack])
    
    useEffect(() => {
        if(IsAdmin) {
            getAllPlayers()
        }
    }, [IsAdmin])

    useEffect(() => {
        let all_players = AllPlayers.sort((a, b) => b[SortBy] - a[SortBy])
        localStorage.setItem('sort_by', SortBy)
        setAllPlayers(() => [...all_players])
    }, [SortBy])
    
    let state = {
        IsLogged: [IsLogged, setIsLogged],
        IsAdmin: [IsAdmin, setIsAdmin],
        PlayerInfo: [PlayerInfo, setPlayerInfo],
        AllPlayers: [AllPlayers, setAllPlayers],
        tokenCookie: tokenCookie,
        SortBy: [SortBy, setSortBy],
        CallBack: [CallBack, setCallBack],
    }
    
    return (
        <GlobaleCotext.Provider value={state} >
            {children}
        </GlobaleCotext.Provider>
    )
}

export default GlobaleCotext
