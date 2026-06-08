import React, { useEffect } from 'react';

export default function ImageZoomModal({ isOpen, src, onClose, onNext, onPrev, showArrows }) {
  // אם המודל לא צריך להיות פתוח, אל תרנדר כלום
  if (!isOpen || !src) return null;

  // מאזין למקלדת: ניווט עם החצים וסגירה עם Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (showArrows) {
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, showArrows]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 cursor-zoom-out select-none"
      onClick={onClose}
    >
      {/* כפתור סגירה (X) עליון */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-sky-500/50 backdrop-blur transition z-50 text-xl font-light"
      >
        ✕
      </button>

      {/* חצי ניווט בתוך המודל בגדול */}
      {showArrows && (
        <>
          {/* חץ שמאלה (קודם) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/60 text-slate-400 border border-slate-800 text-2xl backdrop-blur transition hover:text-white hover:border-sky-500/50 hover:bg-slate-900/90 z-50 cursor-pointer"
          >
            ←
          </button>
          
          {/* חץ ימינה (הבא) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/60 text-slate-400 border border-slate-800 text-2xl backdrop-blur transition hover:text-white hover:border-sky-500/50 hover:bg-slate-900/90 z-50 cursor-pointer"
          >
            →
          </button>
        </>
      )}

      {/* קונטיינר התמונה המוגדלת */}
      <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl shadow-sky-500/5 animate-fadeIn">
        <img 
          src={src} 
          alt="Zoomed Project Screenshot" 
          className="w-full h-auto max-h-[85vh] object-contain cursor-default"
          onClick={(e) => e.stopPropagation()} // מונע סגירה של המודל כשנוגעים בתמונה עצמה
        />
      </div>
    </div>
  );
}