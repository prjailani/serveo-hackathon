import { Routes, Route } from 'react-router-dom';
import Volunteer from './components/Volunteer';
import Organization from './components/Organization';

function App() {
  return (
    <Routes>
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/organization" element={<Organization />} /> 
    </Routes>
  );
}

export default App;
