import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./components/AnimatedRoutes"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import IsLoadingScreen from "./components/IsLoadingScreen"

import './App.scss'
import Notifications from "./components/Notifications"


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<IsLoadingScreen />}>
                <Navbar />
                <Notifications />
                <AnimatedRoutes />
                {/* <Footer /> */}
            </Suspense>
        </BrowserRouter>
    )
}

export default App