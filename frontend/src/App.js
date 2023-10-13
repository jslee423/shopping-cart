import { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Products from "./pages/Products/Products"
import Login from "./pages/LoginSignUp/Login"
import './App.scss'
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import SignUp from "./pages/LoginSignUp/SignUp"
import About from "./pages/About/About"


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App