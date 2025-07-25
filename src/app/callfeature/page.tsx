'use client';
import { useEffect, useState } from 'react';

export default function DialPad() {
  const [number, setNumber] = useState('');
  const [inCall, setInCall] = useState(false);
  const [callTime, setCallTime] = useState(0);

  // Timer for call duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inCall) {
      timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
    } else {
      setCallTime(0);
    }
    return () => clearInterval(timer);
  }, [inCall]);

  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePress = (value: string) => {
    setNumber(prev => prev + value);
  };

  const handleCall = () => {
    if (number) {
      setInCall(true);
    }
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleEndCall = () => {
    setInCall(false);
    setNumber('');
  };

  const dialButtons = ['1','2','3','4','5','6','7','8','9','*','0','#'];

  // === DIAL PAD VIEW ===
  const renderDialPad = () => (
    <div className="w-full max-w-sm p-6 bg-black text-white rounded-2xl shadow-lg">
      <div className="text-2xl text-center mb-6 font-mono tracking-wider">
        {number || '(555) 555-5555'}
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {dialButtons.map((btn, index) => (
          <button
            key={index}
            className="bg-gray-800 hover:bg-gray-700 w-20 h-20 rounded-full text-2xl font-semibold shadow-md"
            onClick={() => handlePress(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-10">
        <button
          onClick={handleBackspace}
          className="bg-red-600 hover:bg-red-700 w-14 h-14 rounded-full text-xl flex items-center justify-center"
        >
          ✖
        </button>
        <button
          onClick={handleCall}
          className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full text-xl flex items-center justify-center"
        >
          📞
        </button>
      </div>
    </div>
  );

  // === CALL SCREEN VIEW ===
  const renderCallScreen = () => (
    <div className="w-full max-w-sm p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl shadow-xl flex flex-col items-center">
      <img
        src="https://via.placeholder.com/80"
        alt="contact"
        className="w-20 h-20 rounded-full mb-4"
      />
      <div className="text-xl font-medium">FinCoach AI</div>
      <div className="text-sm mb-8 text-gray-300">{formatTime(callTime)}</div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'mute', icon: '🔇' },
          { label: 'keypad', icon: '🔢' },
          { label: 'audio', icon: '🔈' },
          { label: 'add call', icon: '➕' },
          { label: 'FaceTime', icon: '🎥' },
          { label: 'contacts', icon: '👥' },
        ].map((btn, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl mb-2">
              {btn.icon}
            </div>
            <span className="text-sm text-center">{btn.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleEndCall}
        className="bg-red-600 hover:bg-red-700 w-16 h-16 rounded-full text-xl flex items-center justify-center"
      >
        🔚
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {inCall ? renderCallScreen() : renderDialPad()}
    </div>
  );
}
