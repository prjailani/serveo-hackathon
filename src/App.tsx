import { Routes, Route } from 'react-router-dom';
import Volunteer from './components/Volunteer';
import CreateEvent from './components/CreateEvent';
import Organization from './components/Organization';
import SideBar from './components/SideBar';

function App() {
  return (
    <Routes>
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/create-event" element={<CreateEvent />} /> 
      <Route path="/organization" element={<Organization />} />
      <Route path="/sidebar" element={<SideBar/>}/>
    </Routes>
  );
}

export default App;
