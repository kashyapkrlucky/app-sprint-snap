// components/Team.js
import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../../shared/Avatar';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS, SEARCH_USERS } from '../../graphql/queries';
import { ADD_PROJECT_MEMBER } from '../../graphql/mutations';
import { AuthContext } from '../../contexts/AuthContext';

const Team = ({ project, team }) => {
    const { user } = useContext(AuthContext);
    const [srcText, setSrcText] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);

    const { data, loading, error } = useQuery(SEARCH_USERS, {
        variables: { text: srcText },
        skip: !triggerSearch || srcText.length <= 3, // Skip the query if conditions aren't met
    });

    const [addMember] = useMutation(ADD_PROJECT_MEMBER, {
        refetchQueries: [{ query: GET_PROJECTS, variables: { userId: user?.id } }]
    });

    useEffect(() => {
        if (srcText.length > 3) {
            setTriggerSearch(true);
        } else {
            setTriggerSearch(false);
        }
        return () => {
            console.log('cleaning users');
        };
    }, [srcText]);

    const onAddMember = (id) => {
        const payload = {
            userId: id,
            id: project
        }
        addMember({
            variables: payload
        })
        setSrcText('');
        setTriggerSearch(false);
    }

    return (
        <div className="rounded-lg border flex flex-col gap-4">

            <div className='w-full flex-1 relative px-4 lg:px-2'>
                <input className='w-full py-2 px-4 rounded-md outline-none' type='text' placeholder='Search People' value={srcText} onChange={(e) => setSrcText(e.target.value)} />
                {srcText.length > 1 && <button className='absolute right-2 top-2' onClick={() => setSrcText('')}>
                    <XCircleIcon className='w-6 h-6 text-white' />
                </button>}

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <div>
                        {data?.searchUsers && data?.searchUsers?.length > 0 ?
                                <div className='bg-white p-2 border shadow-sm rounded-md absolute w-96' style={{ top: '52px' }}>
                                    {data?.searchUsers?.map(user => (
                                        <div key={user?.id} className='flex flex-row rounded-md items-center p-2 gap-4 hover:bg-gray-100'>
                                            <Avatar imageUrl={user?.avatar} name={user?.fullName} />
                                            <h3 className='font-medium' onClick={() => setSrcText('')}>{user?.fullName}</h3>
                                            <button className='text-xs' onClick={() => onAddMember(user?.id)}>Add</button>
                                        </div>))}
                                </div>
                                : (srcText.length > 3 && <div className='bg-white p-2 border shadow-sm rounded-md absolute w-96' style={{ top: '52px' }}>
                                    <span className='text-xs'>No Search Results...</span></div>)
                        }
                    </div>
                )}



            </div>

            {team?.map((member, index) => (
                <div key={index} className="flex flex-row gap-4 p-4 rounded-lg flex items-center">
                    <Avatar imageUrl={member?.avatar} name={member?.fullName} title={member?.fullName} />
                    <div>
                        <p className="font-semibold">{member?.fullName}</p>
                        <p className="text-gray-600 text-sm">{member?.role}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Team;
