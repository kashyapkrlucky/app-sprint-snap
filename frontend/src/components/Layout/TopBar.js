// components/Topbar.js
import React, { useContext } from 'react';
import ProjectDropdown from '../Projects/ProjectDropdown';
import { useAppSelection } from '../../contexts/AppSelectionContext';
import { NavLink } from 'react-router-dom';

import { Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Avatar from '../../shared/Avatar';
import { AuthContext } from '../../contexts/AuthContext';

const TopBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigation = [
        { name: 'My Profile', href: `/profile/${user && user.id}`, icon: <UserCircleIcon className='w-6 h-6' /> },
        { name: 'Settings', href: '/settings', icon: <Cog6ToothIcon className='w-6 h-6' /> }
    ];

    const onLogout = () => {
        localStorage.clear();
        logout();
    }
    return (
        <div className="bg-white shadow-md flex justify-between items-center px-6 py-3 h-16">
            
            <ProjectDropdown />
            {/* Search Bar */}
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 bg-gray-100 text-gray-800 rounded-full focus:outline-none"
                />
                <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                </svg>
            </div>

            {/* User Info & Action Menu */}
            {
                user ? <>

                    <Menu as="div" className="relative ml-3">
                        <div>
                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <div className='bg-white rounded-full'>{user && <Avatar imageUrl={user?.avatar} name={user?.fullName} size="md" />}</div>
                            </MenuButton>
                        </div>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            {navigation.map((item) => (
                                <MenuItem key={item.name}>
                                    <a
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        {item.name}
                                    </a>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <button className='w-full text-sm px-4 py-2 text-left' onClick={onLogout}>Logout</button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </> : <>
                    <NavLink to="/signin" className={'text-gray-300'}>Sign In</NavLink>
                    <NavLink to="/signup" className={'text-gray-300'}>Join Now</NavLink>
                </>
            }
        </div>
    );
};

export default TopBar;
