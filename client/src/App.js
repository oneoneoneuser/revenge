import React from 'react'
import Routers from './Routers'
import { DataProvider } from './Pages/GlobalContext'

function App() {
    return (
        <DataProvider>
            <Routers />
        </DataProvider>
    )
}

export default App