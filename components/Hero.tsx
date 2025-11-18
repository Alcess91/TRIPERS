'use client';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight mb-12">
            Nous voyageons d'abord. Nous vous présentons les bonnes personnes ensuite.
          </h1>

          {/* Bouton CTA */}
          <button
            onClick={() => scrollToSection('destinations')}
            className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors border-2 border-gray-900"
            aria-label="Découvrir toutes nos destinations de voyage"
          >
            Découvrez nos destinations
          </button>
        </div>
      </div>
    </section>
  );
}
