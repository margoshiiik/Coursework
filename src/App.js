import {useState} from 'react';
import './App.css';
import StarterPage from './StarterPage'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Room from './Room'
import UserPage from './UserPage';

function App() {
  let [user, setUser] = useState({});
  let [room, setRoom] = useState({});
  
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route exact path='/' element={<StarterPage setUser={setUser}/>} />
          <Route path='/userpage' element={<UserPage user={user} setRoom={setRoom}/>} />
          <Route path='/room/:code' element={<Room user={user} room={setRoom}/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
