import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './Layout.css'

const Layout = ({ children }) => {

  return (
    <div className='layout'>
      <Sidebar/>
        {children}
    </div>
  );
};

export default Layout;