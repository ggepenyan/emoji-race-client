import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import useTapBurst from '../hooks/useTapBurst.js';

export default function TapButton() {
  const { id } = useParams();
  const tapButtonRef = useRef(null);

  useTapBurst(id, tapButtonRef);

  return (
    <button ref={tapButtonRef} className="select-none active:scale-95 bg-indigo-600 text-white px-8 py-4 rounded text-xl shadow-md">
      TAP!
    </button>
  );
}
