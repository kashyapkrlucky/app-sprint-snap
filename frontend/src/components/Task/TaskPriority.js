import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'

function TaskPriority({ type }) {
    const [color, setColor] = useState('text-red-600');

    useEffect(() => {
        const values = [
            { name: 'Low', color: 'text-yellow-600' },
            { name: 'Medium', color: 'text-amber-600' },
            { name: 'High', color: 'text-red-600' }
        ];
        const item = values.find(v => v?.name === type);
        setColor(item?.color);
    }, [type])

    return (
        <ExclamationTriangleIcon className={'w-5 h-5 ' + color} title={type} />
    )
}

export default TaskPriority