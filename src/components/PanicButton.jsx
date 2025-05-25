import { useEffect, useState } from 'react';
import { socket } from '../socket.js';

export default function PanicButton() {
  const [visible, setVisible] = useState(false);
  const [raceId, setRace] = useState(null);

  useEffect(() => {
    socket.on('showPanic', ({ raceId }) => {
      setRace(raceId);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    });
    return () => socket.off('showPanic');
  }, []);

  if (!visible) return null;
  return (
    <button
      onClick={() => socket.emit('claimPanic', { raceId })}
      className="bg-red-500 text-white px-4 py-2 rounded animate-pulse">
      PANIC!
    </button>
  );
}
