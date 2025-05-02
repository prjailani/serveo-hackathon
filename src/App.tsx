import { Routes, Route } from 'react-router-dom';
import Volunteer from './components/Volunteer';
import CreateEvent from './components/CreateEvent';
import Organization from './components/Organization';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/create-event" element={<CreateEvent />} /> 
      <Route path="/organization" element={<Organization />} />
      <Route path='/volunteer-dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
