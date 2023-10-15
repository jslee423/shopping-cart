import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./components/AnimatedRoutes"
import Navbar from "./components/Navbar"

import './App.scss'


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <AnimatedRoutes />
            </Suspense>
        </BrowserRouter>
    )
}

export default App