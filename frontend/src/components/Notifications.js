import React, { useRef, useState } from 'react'
import notificationImg from '../images/bell.png'

import '../styles/components/Notifications.scss'

const Notifications = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = useRef()

    const openNotifications = () => {
        setShowNotifications(true)
        notificationRef.current.style.width = "25rem";
    }

    const closeNotifications = () => {
        notificationRef.current.style.width = "0";
    }

    return (
        <>
        <button id="notifications" onClick={() => openNotifications()}><img src={notificationImg} alt='notifications icon' /><span id="notifCount">1</span></button>

        <div id="mySidenav" class="notificationList" ref={notificationRef}>
            {/* <a href="javascript:void(0)" class="closebtn" onClick={() => closeNotifications()}>&times;</a> */}
            {/* <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a> */}
            <button className="closebtn" onClick={() => closeNotifications()}>&times;</button>
            
        </div>
        </>
    )
}

export default Notifications