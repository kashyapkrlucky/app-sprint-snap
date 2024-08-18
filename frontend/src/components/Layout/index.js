import React from 'react'
import Sidebar from './SideBar'
import TopBar from './TopBar';

function Layout({ children }) {
  return (
    <main className='flex flex-row h-screen'>
      <Sidebar />
      <section className='w-full flex flex-col'>
        <TopBar />
        <div className='flex-1 overflow-y-scroll'>
          {children}
        </div>
      </section>
    </main>
  )
}

export default Layout