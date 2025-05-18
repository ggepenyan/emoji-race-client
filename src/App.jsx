import { Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby.jsx';
import Track from './components/Track.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/race/:id" element={<Track />} />
    </Routes>
  );
}
