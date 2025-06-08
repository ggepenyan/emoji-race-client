import { useEffect, useRef } from 'react';
import { socket } from '../socket.js';

export default function useTapBurst(raceId, tapButtonRef) {
  const pending = useRef(0);

  useEffect(() => {
    if (!tapButtonRef?.current) {
      return;
    }
    const inc = () => pending.current++;

    tapButtonRef.current.addEventListener('mousedown', inc);
    tapButtonRef.current.addEventListener('touchstart', inc);

    const t = setInterval(() => {
      if (pending.current > 0) {
        socket.emit('tapBurst', { raceId, d: pending.current });
        pending.current = 0;
      }
    }, 100);

    return () => {
      tapButtonRef.current?.removeEventListener('mousedown', inc);
      tapButtonRef.current?.removeEventListener('touchstart', inc);
      clearInterval(t);
    };
  }, [raceId, tapButtonRef]);
}
