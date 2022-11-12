import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './PAGES/Landing';
import Battle from './PAGES/Battle';
import Gallery from './PAGES/Gallery';
import History from './PAGES/History';
import Top5 from './PAGES/Top5';
import Bottom5 from './PAGES/Bottom5';
import HamsterInfo from './PAGES/HamsterInfo';
import Nav from './COMPONENTS/Nav';
import { createContext, useContext, useState } from "react"
import { errorObjInterface } from './MODELS/interfaces';

export const MyGlobalErrorContext = createContext<any>(null)

// //Skapar en global-context-hook
export const useGlobalErrorContext = () => useContext(MyGlobalErrorContext)

function App() {

  const [errObj, setErrObj] = useState<errorObjInterface>({ message: "", status: 0 })

  return (
    <div className="App">
      <Nav />
      <MyGlobalErrorContext.Provider value={{ errObj, setErrObj }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/history" element={<History />} />
          <Route path="/top5" element={<Top5 />} />
          <Route path="/bottom5" element={<Bottom5 />} />
          <Route path="/hamster" element={<HamsterInfo />} />
        </Routes>
      </MyGlobalErrorContext.Provider>
    </div>
  );
}

export default App;
