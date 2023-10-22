import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./components/AnimatedRoutes"
import Navbar from "./components/Navbar"

import './App.scss'
import Footer from "./components/Footer"
import IsLoadingScreen from "./components/IsLoadingScreen"


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<IsLoadingScreen />}>
                <Navbar />
                <AnimatedRoutes />
                {/* <Footer /> */}
            </Suspense>
        </BrowserRouter>
    )
}

export default App