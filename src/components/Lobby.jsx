import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emojiRE = /\p{Extended_Pictographic}$/u;   // one trailing emoji

export default function Lobby() {
  const nav = useNavigate();
  const [code, setCode]   = useState('ABCD');
  const [emoji, setEmoji] = useState('🚀');
  const [error, setError] = useState('');

  function join() {
    if (!emojiRE.test(emoji)) return setError('Please enter ONE emoji 🔥');
    nav(`/race/${code.toUpperCase()}?e=${encodeURIComponent(emoji)}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#a7c2d6]">
      <h1 className="text-4xl font-bold text-gray-900">Tap-Sprint Emoji Race</h1>

      <div className="space-y-4 bg-white/70 p-6 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Race code
          </label>
          <input
            value={code}
            onChange={e => setCode(e.target.value.slice(0, 6))}
            className="border rounded w-40 text-center py-2 text-lg tracking-widest"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your emoji
          </label>
          <input
            value={emoji}
            onChange={e => setEmoji(e.target.value.trim().slice(-2))}
            className="border rounded w-20 text-center py-2 text-2xl"
            placeholder="🚀"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={join}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Join race
        </button>
      </div>
    </div>
  );
}
