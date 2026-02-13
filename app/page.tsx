"use client";
import { useState } from 'react';

export default function Generator() {
  const [names, setNames] = useState({ from: '', to: '' });
  const [generatedLink, setGeneratedLink] = useState('');

  const generate = () => {
    if (names.from && names.to) {
      const baseUrl = window.location.origin;
      setGeneratedLink(`${baseUrl}/ui/valentine?from=${encodeURIComponent(names.from)}&to=${encodeURIComponent(names.to)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe4f3] p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-[0_20px_50px_rgba(255,182,193,0.5)] border-4 border-white text-center">
        <div className="text-5xl mb-4">💌</div>
        <h1 className="text-[#ff4d8d] text-3xl font-bold mb-2">Love Link Creator</h1>
        <p className="text-[#ff85b3] mb-8">Create a surprise for your special person</p>
        
        <div className="space-y-4">
          <input 
            type="text" placeholder="Your Name"
            className="w-full p-4 rounded-2xl border-2 border-[#ffd1e8] focus:border-[#ff4d8d] outline-none text-[#ff4d8d] placeholder:text-[#ffb3d1]"
            onChange={(e) => setNames({...names, from: e.target.value})}
          />
          <input 
            type="text" placeholder="Bae's Name"
            className="w-full p-4 rounded-2xl border-2 border-[#ffd1e8] focus:border-[#ff4d8d] outline-none text-[#ff4d8d] placeholder:text-[#ffb3d1]"
            onChange={(e) => setNames({...names, to: e.target.value})}
          />
          <button 
            onClick={generate} 
            className="w-full bg-[#ff4d8d] hover:bg-[#ff1a6b] text-white font-bold py-4 rounded-2xl text-lg shadow-md transform transition active:scale-95"
          >
            Create Magic Link ✨
          </button>
        </div>

        {generatedLink && (
          <div className="mt-8 p-4 bg-white rounded-2xl border-2 border-dashed border-[#ff4d8d] animate-in zoom-in duration-300">
             <p className="text-xs text-[#ff4d8d] uppercase font-bold tracking-widest mb-2">Ready to send!</p>
             <input readOnly value={generatedLink} className="w-full p-2 bg-transparent text-center text-sm text-gray-600 outline-none" />
             <button 
               onClick={() => {navigator.clipboard.writeText(generatedLink); alert("Link Copied! 💖")}}
               className="mt-2 text-[#ff4d8d] font-bold text-sm hover:underline"
             >
               Copy Link
             </button>
          </div>
        )}
      </div>
    </div>
  );
}