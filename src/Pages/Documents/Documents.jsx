import React from 'react'
import './Document.css'
import TopNav from '../../Components/TopNav/TopNav'
import SideBar from '../../Components/SideBar/SideBar'
import FileStorage from './Components/FileStorage'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
                <DndProvider backend={HTML5Backend}>
                    <FileStorage />
                </DndProvider>
            </div>
        </div>
    )
}

export default Documents
