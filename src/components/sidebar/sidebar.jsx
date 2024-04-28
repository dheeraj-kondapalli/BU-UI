import React from 'react'
import './sidebar.css'

const sidebar = () => {
  return (
    <div className='sidebar-container'>
        <a href= "/home" > admin </a>
        <a href= "/file" > files </a>
    </div>
  )
}

export default sidebar