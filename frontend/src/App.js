import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./components/AnimatedRoutes"
import Navbar from "./components/Navbar"

import './App.scss'
import Footer from "./components/Footer"


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <AnimatedRoutes />
                <Footer />
            </Suspense>
        </BrowserRouter>
    )
}

export default App