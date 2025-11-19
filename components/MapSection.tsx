import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const TripersMap = dynamic(
  () => import('./TripersMapReal'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    )
  }
);

export default function MapSection() {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
            Explorez la carte
          </h2>
          <p className="text-lg text-gray-600">
            Chaque repère correspond à un endroit où TRIPERS a passé du temps, rencontré des guides de confiance. 
            Ce ne sont pas des destinations théoriques : ce sont des personnes que nous avons rencontrées, 
            avec qui nous avons voyagé, et que nous vous présentons ensuite.
          </p>
        </div>

        {/* Carte */}
        <div className="max-w-6xl mx-auto">
          <TripersMap />
        </div>
      </div>
    </section>
  );
}
