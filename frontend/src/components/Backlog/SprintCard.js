import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

function SprintCard({ name, tasks = [] }) {
    return (
        <div className='flex flex-col gap-2 bg-gray-100 border p-4'>
            <div className='flex flex-row gap-2'>
                {
                    name ?
                        <p>{name}</p> :
                        <input type='text' placeholder='Sprint Name' className='px-4 py-1 rounded-md border-2' />
                }
                <button>
                    <CheckCircleIcon className='w-6 h-6' />
                </button>
                <button>
                    <XCircleIcon className='w-6 h-6' />
                </button>
            </div>
            <div className='flex flex-col gap-4 py-4 border-2 border-dashed border-gray-400 bg-gray-100 rounded-md'>
                {
                    tasks.length > 0 ?
                        tasks.map(t => (
                            <div key={t}>
                                {t}
                            </div>
                        )) :
                        <div className='w-full flex flex-row text-xs justify-center items-center text-gray-400 select-none'>No tickets yet...</div>
                }
            </div>
        </div>
    )
}

export default SprintCard