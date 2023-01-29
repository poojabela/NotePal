import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Add from "./Add"
import Header from "./components/Header";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<Add />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
