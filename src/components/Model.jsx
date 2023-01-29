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
                <button onClick={onClose} className="bg-[rgba(255,82,82,0.5)] text-[#ff0000] border-[#ff0000] border-[2px] px-3 py-2 mr-2">X</button>
                <button onClick={handlePinToggle} className="bg-[rgba(99,255,82,0.5)] text-[#039c06] border-[#039c06] border-[2px] px-3 py-2">
                    {isPinned ? "Unpin" : "Pin"}
                </button>
            </div>
            <form action="" onSubmit={handleUpdate} className="flex flex-col items-center justify-center">
                <input 
                type="text"
                name="title"
                value={currentTitle} 
                placeholder="title"
                onChange={handleChangeTitle}
                className="mb-2 px-10 py-2 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] "
                />
                <input 
                type="text"
                name="tagline"
                value={currentTagline}
                placeholder="tagline" 
                onChange={handleChangeTagline}
                className="mb-2 px-10 py-2 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)]"
                />
                <textarea name="body" 
                value={currentBody} 
                onChange={handleChangeBody}
                className="mb-2 px-10 py-6 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)]"
                />
                <div className="flex">
                    <button type="submit" className="bg-[rgba(203,61,231,0.5)] text-[#9d00ff] border-[#9d00ff] border-[2px] px-4 py-2 mr-2">Update</button>
                    <button onClick={handleDelete} className="bg-[rgba(255,82,82,0.5)] text-[#ff0000] border-[#ff0000] border-[2px] px-4 py-2">Delete</button>
                </div>
            </form>
        </div>
     );
}
 
export default Model;