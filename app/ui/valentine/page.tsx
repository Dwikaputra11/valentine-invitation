"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ValentineContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || "Bae";
    const to   = searchParams.get('to') || "Bae";

    const [isAccepted, setIsAccepted] = useState(false);
    const [noCount, setNoCount] = useState(0);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });


    const maxGrow = 5;
    const growCount = Math.min(noCount, maxGrow);

    const yesPaddingX = 40 + growCount * 10;
    const yesPaddingY = 12 + growCount * 4;
    const yesFontSize = 24 + growCount * 2;


    const noTexts = [
        "No, I don't wanna",
        "Are you sure?",
        "Really sure??",
        "Think again! 🥺",
        "Think more deeper",
        "Okay, if you reject it you can press this 💔"
    ];

    const handleNoClick = () => {
        setNoCount(prev => prev + 1);
        
        const maxWidth = window.innerWidth - 150;
        const maxHeight = window.innerHeight - 100; 

        if (noCount >= 4) {
            const randomX = Math.floor(Math.random() * maxWidth)
            const randomY = Math.floor(Math.random() * maxHeight)
            setNoBtnPos({ x: randomX, y: randomY });
        }
    };


    if(isAccepted){
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe4f3] animate-in fade-in duration-1000">
                <h1 className="text-[#ff4d8d] text-5xl font-bold mb-5 drop-shadow-sm text-center px-4">
                    Yaaay! I love you! 💖
                </h1>
                <img 
                src="https://media2.giphy.com/media/h20IwOYYJgCMbj4uaD/giphy.gif" 
                alt="Love" 
                className="rounded-3xl border-8shadow-xl"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe4f3] overflow-hidden relative">
            {/* Decorative Floating Hearts (Simple CSS animation) */}
            <div className="absolute top-10 left-10 animate-bounce text-4xl">🌸</div>
            <div className="absolute bottom-20 right-10 animate-pulse text-4xl">✨</div>
            <div className="absolute top-1/4 right-5 animate-bounce text-4xl">💖</div>

            <h1 className="text-[#ff4d8d] text-4xl font-bold mb-8 leading-tight">
            Will you be my valentine, <span className="underline decoration-wavy text-[#ff85b3]">{to}</span>? 💝
            </h1>
            
            <div className="mb-8 transform hover:scale-105 transition-transform">
            <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueG56Znd4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/VM1fcpu2bKs1e2Kdbj/giphy.gif" 
                alt="Cute Bear" 
                className="rounded-2xl"
            />
            </div>

            <div 
                // style={{ gap: noCount >= 5 ? '0px' : `${dynamicGap}px` }}
                className="flex flex-row gap-3 items-center justify-center"
            >
                {/* YES BUTTON */}
                <button
                    style={{
                        padding: `${yesPaddingY}px ${yesPaddingX}px`,
                        fontSize: `${yesFontSize}px`
                    }}
                    className="bg-[#ff4d8d] hover:bg-[#ff1a6b] text-white font-bold rounded-full shadow-lg transition-all active:scale-95"
                    onClick={() => setIsAccepted(true)}
                    >
                    Yes!
                </button>
                
                {/* NO BUTTON */}
                <button 
                    style={noCount >= 5 ? {
                        position: 'fixed',
                        left: `${noBtnPos.x}px`,
                        top: `${noBtnPos.y}px`,
                        transition: 'all 0.2s ease',
                        zIndex: 40
                    } : {
                        // Standard styling before it starts moving
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        zIndex: 40
                    }}
                    className="text-[#ff4d8d] bg-white border-2 border-[#ff4d8d] px-6 py-2 rounded-full text-lg hover:bg-gray-50 transition-all z-40"
                    onClick={handleNoClick}
                >
                    {/* Display different text based on count, stops at the last message */}
                    {noTexts[Math.min(noCount, noTexts.length - 1)]}
                </button>
            </div>

            <div className="fixed bottom-8 text-[#ff4d8d] text-lg font-medium italic">
                With love, {from} 💕
            </div>
        </div>
    );
}

export default function ValentinePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <ValentineContent />
    </Suspense>
  );
}