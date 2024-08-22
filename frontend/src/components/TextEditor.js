import { BoldIcon, ItalicIcon, UnderlineIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";

const TextEditor = ({submitComment}) => {
    const editorRef = useRef(null);
    const [selectedStyle, setSelectedStyle] = useState("");

    const applyStyle = (command) => {
        document.execCommand(command, false, null);
        setSelectedStyle(command);
    };

    // const insertImage = () => {
    //     const url = prompt("Enter the image URL");
    //     if (url) {
    //         document.execCommand("insertImage", false, url);
    //     }
    // };

    const buttons = [
        { name: 'bold', icon: <BoldIcon className="w-4 h-4" /> },
        { name: 'italic', icon: <ItalicIcon className="w-4 h-4" /> },
        { name: 'underline', icon: <UnderlineIcon className="w-4 h-4" /> },
        // { name: 'insertOrderedList', icon: <ListBulletIcon className="w-4 h-4" /> },
        // { name: 'insertUnorderedList', icon: <NumberedListIcon className="w-4 h-4" /> },

    ]

    const handleSubmit = () => {
        if (editorRef.current) {
            submitComment(editorRef.current.innerHTML);
        }
    };

    return (
        <>
            <div className="w-full border rounded-md">
                <div className="flex flex-row border-b">
                    {buttons.map(btn => (
                        <button key={btn?.name} onClick={() => applyStyle(`${btn?.name}`)} className={`px-4 py-2 ${selectedStyle === btn?.name ? 'text-blue-700' : 'text-gray-400'} hover:bg-gray-200`}>
                            {btn?.icon}
                        </button>
                    ))}
                    {/* <button
                    onClick={insertImage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                >
                    <PhotoIcon className="w-4 h-4"/>
                </button> */}
                </div>
                <div
                    ref={editorRef}
                    contentEditable={true}
                    className="p-4 min-h-[200px] focus:outline-none"
                ></div>

            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Submit
            </button>
        </>
    );
};

export default TextEditor;
