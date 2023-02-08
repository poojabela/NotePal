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
        <form onSubmit={handleSave} className="flex flex-col justify-center items-center">
            <input 
            type="text"
            placeholder="write title" 
            name="title"
            className="mb-2 h-[60px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
            />
            <input 
            type="text"
            placeholder="write tagline" 
            name="tagline"
            className="mb-2 h-[60px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
            />
            <textarea    
            placeholder="body"
            name="body"
            className="mb-2 h-[100px] w-[250px] px-[5px] rounded-sm border-[2px] focus:border-sky-500 focus:outline-none focus:shadow-[4px_4px_50px_rgba(68,97,246,0.7)] md:w-[300px]"
            />
            <button type="submit" className="bg-[#fb7185cc] px-5 py-2 rounded-sm">Save</button>
        </form>
     );
}
 
export default Add;