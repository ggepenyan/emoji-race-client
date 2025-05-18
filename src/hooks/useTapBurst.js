import { useEffect, useRef } from 'react';
import { socket } from '../script.js';

export default function useTapBurst(raceId) {
  const pending = useRef(0);
  useEffect(() => {
    const inc = () => pending.current++;

    document.addEventListener('mousedown', inc);
    document.addEventListener('touchstart', inc);

    const t = setInterval(() => {
      if (pending.current > 0) {
        socket.emit('tapBurst', { raceId, d: pending.current });
        pending.current = 0;
      }
    }, 100);
    return () => {
      document.removeEventListener('mousedown', inc);
      document.removeEventListener('touchstart', inc);
      clearInterval(t);
    };
  }, [raceId]);
}
