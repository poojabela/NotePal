import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom";

const Add = () => {

    const docRef = collection(db, 'notes')
    const navigate = useNavigate()

    const handleSave = async (event) => {

        event.preventDefault();

        const formData = new FormData(event.target)

        try {
            await addDoc(docRef, {
                title: formData.get("title"),
                tagline: formData.get("tagline"),
                body: formData.get("body"),
                pinned: false
            }) .then(() => {
                navigate('/')
            }) 
        } catch(error) {
            console.error(error)
        }
    }

    return ( 
        <form onSubmit={handleSave} className="flex flex-col justify-center items-center grow">
            <input 
            type="text"
            placeholder="write title" 
            name="title"
            className="mb-2 px-10 py-2 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)]"
            />
            <input 
            type="text"
            placeholder="write tagline" 
            name="tagline"
            className="mb-2 px-10 py-2 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)]"
            />
            <textarea    
            placeholder="body"
            name="body"
            className="mb-2 px-10 py-6 rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)]"
            />
            <button type="submit" className="bg-[rgba(203,61,231,0.5)] text-[#9d00ff] border-[#9d00ff] border-[2px] px-4 py-2 mr-2">Save</button>
        </form>
     );
}
 
export default Add;