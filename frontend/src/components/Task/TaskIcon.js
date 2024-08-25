import { BugAntIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import React from 'react'

function TaskIcon({ type }) {
    const item = type !== 'bug' ? <BookmarkIcon className='w-5 h-5' /> : <BugAntIcon className='w-5 h-5' />
    const iconBg = type !== 'bug' ? 'text-green-600' : 'text-red-600';
    return <span className={iconBg}>{item}</span>
}

export default TaskIcon