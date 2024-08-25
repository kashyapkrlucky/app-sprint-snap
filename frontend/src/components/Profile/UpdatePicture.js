/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { Avatars } from '../../utils/Data';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_INFO } from '../../graphql/mutations';
import { AuthContext } from '../../contexts/AuthContext';
import Avatar from '../../shared/Avatar';
import Modal from '../../shared/Modal';

function UpdatePicture() {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState();

    const { user, updateUser } = useContext(AuthContext);
    const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

    useEffect(() => {
        setCurrentImg(user?.avatar);
        return () => {
        }
    }, [user])

    const getCurrentImgStyle = (item) => {
        let classes = '';
        if (item?.url === user?.avatar) {
            classes = 'border-purple-700';
        } else if (item.url === currentImg) {
            classes = 'border-green-700';
        } else {
            classes = 'border-white';
        }
        return classes;
    }

    const onUpdate = async () => {
        updateUserInfo({
            variables: {
                avatar: currentImg
            }
        });
        const item = { ...user, avatar: currentImg };
        updateUser(item);
        setIsEditorOpen(false);
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-6 p-4 rounded-xl'>
                <Avatar user={user} size='lg'/>
                <button className='shadow-sm bg-white rounded-md px-4 py-2' onClick={() => setIsEditorOpen(true)} >Change</button>
            </div>

            <Modal title={'Choose Picture'} isOpen={isEditorOpen} onClose={() => { setIsEditorOpen(false); setCurrentImg(''); }}>
                <div className='w-full grid grid-cols-4 lg:grid-cols-8 flex-wrap p-4 gap-2 overflow-y-auto border-b-2 border-slate-100'>
                    {
                        Avatars.map((item, index) => (
                            <div key={index} className={"rounded-full border-4 " + getCurrentImgStyle(item)} onClick={() => setCurrentImg(item.url)}>
                                <img className='rounded-full' src={`/avatars/${item.url}`} alt={index} />
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-end p-4'>
                    <button className='bg-blue-600 rounded-md text-white px-4 py-1' onClick={onUpdate}>Update</button>
                </div>
            </Modal>

        </div>
    )
}

export default UpdatePicture
