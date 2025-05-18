import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../script.js';
import useTapBurst from '../hooks/useTapBurst.js';
import TapButton from './TapButton.jsx';
import PanicButton from './PanicButton.jsx';

export default function Track() {
  const { id } = useParams();
  const [race, setRace] = useState(null);

  useEffect(() => {
    socket.on('state', setRace);
    return () => socket.off('state', setRace);
  }, []);

  useTapBurst(id);

  if (!race) return null;
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Race {id}</h2>
      <div className="relative border w-[1080px] h-16 overflow-hidden">
        {Object.values(race.players).map(p => (
          <div key={p.id}
               className="absolute text-3xl transition-transform duration-[90ms] ease-linear"
               style={{ transform: `translateX(${p.x * 36}px)` }}>
            {p.emoji}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <TapButton />
        <PanicButton />
      </div>
    </div>
  );
}
