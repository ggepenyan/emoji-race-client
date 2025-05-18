import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../script.js';

export default function Lobby() {
  const nav = useNavigate();
  const [code, setCode] = useState('ABCD');
  const [emoji, setEmoji] = useState('🚀');

  function join() {
    socket.emit('joinRace', { raceId: code, emoji });
    nav(`/race/${code}`);
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
             className="border p-2 text-center w-24" placeholder="ABCD" />
      <input value={emoji} onChange={e => setEmoji(e.target.value)}
             className="text-2xl text-center w-16" />
      <button onClick={join}
              className="bg-emerald-600 text-white px-4 py-2 rounded">
        Join Race
      </button>
    </div>
  );
}
