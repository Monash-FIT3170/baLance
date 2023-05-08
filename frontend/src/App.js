import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Home from './pages/Home'
import  ImportClass from './pages/ImportClass'

import DisplayUnitGroups from './pages/DisplayUnitGroups'
import UnitHomePage from './pages/UnitHomePage'
import NavBar from './components/NavBar'
import Groups from './pages/groups'
import Students from './pages/students'
import AssigningPage from './pages/AssigningPage'
//import logo from './assets/logo.png';


const theme = extendTheme({
  colors: {
      balance: {
        header_color: "#F0EDE7",
        logo_purple: "#24265D"
    },

  }
}) 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<UnitHomePage />}/>
            <Route path="/DisplayUnitGroups" element={<DisplayUnitGroups />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/groups" element={<Groups />}/>
            <Route path="/students" element={<Students />}/>
            <Route path="/uploadStudents" element={<ImportClass/>}/>
            <Route path="/assigningPage" element={<AssigningPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
