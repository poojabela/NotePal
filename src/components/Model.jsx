import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"
import { useState } from "react";

const Model = ({ title, id, tagline, body, pinned, onClose}) => {

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentTagline, setCurrentTagline] = useState(tagline);
    const [currentBody, setCurrentBody] = useState(body)
    const [isPinned, setIsPinned] = useState(pinned)
    const docRef = doc(db, 'notes', id)

    const handleChangeTitle = (event) => {
        setCurrentTitle(event.target.value)
    }

    const handleChangeTagline = (event) => {
        setCurrentTagline(event.target.value)
    }

    const handleChangeBody = (event) => {
        setCurrentBody(event.target.value)
    }

    const handleUpdate = async (event) => {

        event.preventDefault();
        const formData = new FormData(event.target)

        try {
            await updateDoc(docRef, {
                title: formData.get("title"),
                tagline: formData.get("tagline"),
                body: formData.get("body"),
            }) .then(() => {
                window.location.reload();
            })
        } catch(error) {
            console.error(error)
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await deleteDoc(docRef)
            .then(() => {
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlePinToggle = async (event) => {
        event.preventDefault();
        try {
        await updateDoc(docRef, { 
            pinned: !isPinned
         });
        setIsPinned(!isPinned);
        } catch (error) {
        console.error(error);
        }
    };

    return ( 
        <div className=" fixed backdrop-blur inset-0 bg-[rgba(0,0,0,0.2)]">
            <div className="buttons flex justify-end mt-2 px-5">
                <button onClick={onClose} className="p-2">X</button>
                <button onClick={handlePinToggle} className="p-2">
                    {isPinned ? "Unpin" : "Pin"}
                </button>
            </div>
            <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center pt-20">
                <input 
                type="text"
                name="title"
                value={currentTitle} 
                placeholder="title"
                onChange={handleChangeTitle}
                className="mb-2 h-[60px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
                />
                <input 
                type="text"
                name="tagline"
                value={currentTagline}
                placeholder="tagline" 
                onChange={handleChangeTagline}
                className="mb-2 h-[60px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
                />
                <textarea name="body" 
                value={currentBody} 
                onChange={handleChangeBody}
                className="mb-2 h-[100px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
                />
                <div className="flex">
                    <button type="submit" className="bg-[#a855f7cc] p-2 rounded-sm mr-2">Update</button>
                    <button onClick={handleDelete} className="bg-[#fb7185cc] p-2 rounded-sm">Delete</button>
                </div>
            </form>
        </div>
     );
}
 
export default Model;