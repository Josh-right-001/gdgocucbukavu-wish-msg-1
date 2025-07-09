
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-google-blue via-google-green to-google-yellow flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo Google Maps animé */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-4 animate-bounce-slow">
            <img 
              src="/lovable-uploads/c1b206a2-e8a6-4d07-afb0-0497c807defb.png" 
              alt="Logo" 
              className="w-full h-full object-contain animate-pulse-slow"
            />
          </div>
          
          {/* Confettis autour du logo */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${50 + 30 * Math.cos(i * 30)}%`,
                top: `${50 + 30 * Math.sin(i * 30)}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Texte de chargement */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white animate-fadeInUp">
            GDG Bukavu
          </h1>
          <p className="text-lg text-white/90 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Wish Message App
          </p>
          
          {/* Barre de progression */}
          <div className="w-64 mx-auto">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/80 mt-2 text-sm animate-pulse">
              Loading... {progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
