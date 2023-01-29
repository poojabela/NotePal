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
        <div className="p-4 grow">
            <div className="grid grid-cols-4 gap-2 items-center">
              {notesToShow.map(note => (
                <div key={note.id} onClick={() => popUp(note)}>
                    <Card title={note.title} tagline={note.tagline} body={note.body} pinned={note.pinned}/>
                </div>
              ))}
            </div>
            {notesToShow.length == 1 && <div className="buttons flex justify-center mt-5">
              <button 
              onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
              className="p-1 text-[#ff5e32] border-[2px] border-[#ff5e32] bg-[#ecb44c] disabled:bg-[rgba(255,94,50,0.2)]"
              >
                  Prev
              </button>
              <span className="p-1">{currentPage}</span>
              <button 
              onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(notes.length / maxData)}
              className="p-1 text-[#008080] border-[2px] border-[#008080] bg-[#30f5f5] disabled:bg-[rgba(0,128,128,0.2)]"
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