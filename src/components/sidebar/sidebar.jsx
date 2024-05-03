import React from 'react'
import { FolderFilled } from '@ant-design/icons'
import { ScheduleFilled } from '@ant-design/icons'
import './sidebar.css'

const sidebar = () => {
  return (
    <div className='sidebar-container'>
        <a href= "/home" ><ScheduleFilled className='sbaricon'/>Admin </a>
        <a href= "/file" ><FolderFilled className='sbaricon'/>File Generator</a>
    </div>
  )
}

export default sidebar