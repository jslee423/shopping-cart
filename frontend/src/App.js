import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./components/AnimatedRoutes"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import IsLoadingScreen from "./components/IsLoadingScreen"
import Notifications from "./components/Notifications"

import './App.scss'
import { useSelector } from "react-redux"


function App() {
    const user = useSelector(state => state.userReducer.user)
    return (
        <BrowserRouter>
            <Suspense fallback={<IsLoadingScreen />}>
                <Navbar />
                {user._id && <Notifications />}
                <AnimatedRoutes />
                {/* <Footer /> */}
            </Suspense>
        </BrowserRouter>
    )
}

export default App