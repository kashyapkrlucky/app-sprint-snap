// components/Topbar.js
import React, { useContext } from 'react';
import ProjectDropdown from '../Projects/ProjectDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

import { Cog6ToothIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Avatar from '../../shared/Avatar';
import { AuthContext } from '../../contexts/AuthContext';
import Create from './Create';

const TopBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const navigation = [
        { name: 'My Profile', href: `/profile/${user && user.id}`, icon: <UserCircleIcon className='w-6 h-6' /> },
        { name: 'Settings', href: '/settings', icon: <Cog6ToothIcon className='w-6 h-6' /> }
    ];

    const onLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <div className="bg-white shadow-md flex justify-between items-center px-4 py-3 h-16 border-b">

            <div className='flex flex-row gap-4 w-1/2'>
                <ProjectDropdown />
                {/* Search Bar */}
                <div className="flex flex-row bg-gray-100 px-2 rounded-md items-center flex-1">
                    <MagnifyingGlassIcon className='w-6 h-6 text-gray-500' />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 text-gray-800 bg-transparent focus:outline-none"
                    />
                </div>
                <Create/>
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
