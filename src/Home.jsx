import { useEffect, useState } from "react"
import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore";
import Card from "./components/Card";
import Model from "./components/Model"

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const maxData = 4;
    const [notes, setNotes] = useState([]);
    const docRef = collection(db, 'notes');
    const [currentData, setCurrentData] = useState({});
    const [openPopup, setOpenPopup] = useState(false)
  
    useEffect(() => {
      const getNotes = async () => {
        try {
        const data = await getDocs(docRef)
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (error) {
        console.error(error)
      }
    }
    getNotes()
    }, [])

    const popUp = (note) => {
      setCurrentData(note)
      setOpenPopup(true)
    }

    const closePopup = () => {
      setOpenPopup(false);
    }

    const pinned = notes.filter(note => note.pinned === true);
    const unpinned = notes.filter(note => note.pinned === false)
    
    const lastPage = currentPage * maxData
    const firstPage = lastPage - maxData
    const notesToShow = [...pinned, ...unpinned].slice(firstPage, lastPage)

    return ( 
        <div className="pt-20">
            <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
              {notesToShow.map(note => (
                <div key={note.id} onClick={() => popUp(note)} className="">
                    <Card title={note.title} tagline={note.tagline} body={note.body} pinned={note.pinned}/>
                </div>
              ))}
            </div>
            {notesToShow.length >= 1 && 
            <div className="buttons flex justify-center mt-5 items-center">
              <button 
              onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
              className="bg-[#a855f7cc] p-2 rounded-sm mr-2"
              >
                  Prev
              </button>
              <span className="p-1">{currentPage}</span>
              <button 
              onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(notes.length / maxData)}
              className="bg-[#fb7185cc] p-2 rounded-sm"
              >
                  Next
              </button>
            </div>}
            <div className="pop-up-container">
              {openPopup && (
                <div className="container" key={currentData.id}>
                  <Model 
                    id={currentData.id} 
                    title={currentData.title} 
                    tagline={currentData.tagline} 
                    body={currentData.body}
                    pinned={currentData.pinned} 
                    onClose={closePopup} />
                </div>
              )}
        </div>
        </div>
     );
}
 
export default Home;