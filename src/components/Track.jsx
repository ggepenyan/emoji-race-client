import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { socket } from '../socket.js';
import TapButton   from './TapButton.jsx';
import PanicButton from './PanicButton.jsx';

const laneHeight = 40;

export default function Track() {
  const nav = useNavigate();
  const { id } = useParams();
  const { search } = useLocation();
  const emoji = new URLSearchParams(search).get('e') || '🚀';
  const trackRef = useRef(null);
  const [trackW, setW] = useState(600);
  const [race, setRace] = useState(null);
  const [winner, setWin] = useState(null);
  const pxPerTile = trackW / 30;

  useEffect(() => {
    socket.emit('joinRace', { raceId: id, emoji });
  }, [id, emoji]);

  useEffect(() => {
    socket.on('state', setRace);
    socket.on('raceFinished', (race) => {
      if (!race?.winnerId) {
        return;
      }
      setWin(race.winnerId);
    });
    return () => {
      socket.off('state').off('raceFinished');
    };
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      setW(entry.contentRect.width);
    });
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  if (!race) return null;

  if (winner) {
    const youWin = winner === socket.id;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#a7c2d6]">
        <div className="bg-white p-8 rounded-xl shadow text-center space-y-4">
          <h2 className="text-3xl font-bold">
            {youWin ? '🎉 You win!' : 'Race finished'}
          </h2>
          <button
            onClick={() => nav('/')}
            className="bg-gray-900 text-white px-6 py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  const lanes = Object.values(race.players);

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 gap-6 bg-[#a7c2d6]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Race {id}
      </h2>

      <div
        ref={trackRef}
        className="relative bg-white/90 rounded-xl shadow-lg overflow-hidden"
        style={{ width: '90vw', maxWidth: 900 }}
      >
        {lanes.map((p) => (
          <div
            key={p.id}
            className="relative border-t first:border-t-0 border-gray-300"
            style={{ height: laneHeight }}
          >
            <div
              className="absolute inset-y-0 right-0 w-[calc(var(--tile))] grid grid-cols-2"
              style={{ '--tile': `${pxPerTile}px` }}
            >
              <div className="bg-black/80"></div><div></div>
              <div></div><div className="bg-black/80"></div>
            </div>
            <div
              className="absolute select-none text-3xl sm:text-4xl"
              style={{
                left: `${(p.x / 30) * 100}%`,
                top: '50%',
                transform: 'translate(0%, -50%)',
                transition: `left ${pxPerTile * 3}ms linear`,
              }}
            >
              {p.emoji}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        <TapButton />
        <PanicButton />
      </div>
    </div>
  );
}
