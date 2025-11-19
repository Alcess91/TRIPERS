'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const HERO_VIDEOS = [
  '/destinations/IMG_4003.mp4',
  '/destinations/IMG_4040.mp4',
] as const;

export default function Hero() {
  const t = useTranslations('hero');
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Conteneur des vidéos avec animation de glissement */}
      <div
        className="absolute inset-0 flex h-full w-full transition-transform duration-[2000ms] ease-in-out"
        style={{ transform: `translateX(-${currentVideo * 100}%)` }}
      >
        {HERO_VIDEOS.map((video, index) => (
          <div key={video} className="flex-shrink-0 w-full h-full relative">
            <video
              autoPlay={index === currentVideo}
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              ref={(videoElement) => {
                if (videoElement) {
                  if (index === currentVideo) {
                    videoElement.currentTime = 0;
                    videoElement.play();
                  } else {
                    videoElement.pause();
                  }
                }
              }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                video.playbackRate = 0.50;
              }}
              onEnded={index === currentVideo ? handleVideoEnd : undefined}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenu */}
      <div className="relative h-full flex items-center justify-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Titre principal */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-8 drop-shadow-lg">
              {t('title')}
            </h1>

            {/* Bouton CTA */}
            <button
              onClick={() => scrollToSection('destinations')}
              className="px-8 py-3 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors border-2 border-white shadow-lg"
              aria-label={t('cta')}
            >
              {t('cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
