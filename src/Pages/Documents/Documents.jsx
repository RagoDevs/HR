import React from 'react'
import './Document.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import comming from '../../Assets/images/coming.jpg'

function Documents() {
    return (
        <div className="document">
            <div className="topnav">
                <TopNav />
            </div>
            <div className="sidenav">
                <SideBar />
            </div>
            <div className="document-main">
                <div className="comming-soon">
                    <img src={comming} alt="" />
                    <h2>Comming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Documents
