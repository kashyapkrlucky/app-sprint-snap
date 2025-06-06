import React, { useState } from 'react'
import { CheckCircleIcon, PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';

function Editable({ type, name, value, updateValue, classes }) {
    const [isEditOn, setIsEditOn] = useState(false);
    const [content, setContent] = useState(value);
    
    const onChange = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        updateValue(name, content);
        setIsEditOn(false);
        setContent('');
    }

    return (
        <>
            {
                isEditOn ?
                    <div className='w-full flex flex-row gap-2'>
                        {type === 'input' && <input className={'flex-1 border rounded px-2 py-1 ' + classes} type='text' value={content} onChange={onChange} />}
                        {type === 'textarea' && <textarea className={'flex-1 border rounded px-2 py-1 ' + classes} value={content} onChange={onChange} />}
                        <button onClick={onSubmit}><CheckCircleIcon className='w-6 h-6' /></button>
                        <button onClick={() => {setIsEditOn(false); setContent(value)}}><XCircleIcon className='w-6 h-6' /></button>
                    </div> :
                    <div className='w-full flex flex-row gap-2' onClick={() => setIsEditOn(true)}>
                        <p className={classes}>{value}</p> <button ><PencilSquareIcon className='w-5 h-5' /></button>
                    </div>
            }
        </>
    )
}

export default Editable