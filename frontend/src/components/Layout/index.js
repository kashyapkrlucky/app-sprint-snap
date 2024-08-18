import React from 'react'
import Sidebar from './SideBar'

function Layout({children}) {
  return (
    <main className='flex flex-row'>
        <Sidebar/>
        {children}
    </main>
  )
}

export default Layout