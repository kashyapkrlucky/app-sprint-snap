import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import EditProfile from '../components/Profile/EditProfile';
import Modal from '../shared/Modal';
import { AuthContext } from '../contexts/AuthContext';
import UpdatePicture from '../components/Profile/UpdatePicture';


function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <header>




      </header>
      <section className='w-1/3 p-4'>


        <UpdatePicture />
        <div className="px-4 sm:px-0">
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
          {/* <button className='px-4 py-2 rounded bg-white border' onClick={() => setIsModalOpen(true)}>Edit</button> */}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.fullName}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email}</dd>
            </div>
          </dl>
        </div>
      </section>
      <Modal title={`Complete Sprint`} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); }}>
        <EditProfile user={user} updateUser={updateUser} />
      </Modal>
    </Layout>
  )
}

export default Profile
