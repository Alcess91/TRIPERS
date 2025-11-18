import Link from 'next/link';
import Image from 'next/image';

export default function DestinationsSection() {
  const destinations = [
    {
      name: 'Maroc',
      slug: 'maroc',
      description:
        "Immersion dans les souks, Marrakech by night, soirées privées, culture & sable chaud.",
      image: '/destinations/maroc-home.jpg',
      imageAlt: 'Pavillon sur l\'eau au Maroc au coucher de soleil',
    },
    {
      name: 'Cap-Vert',
      slug: 'cap-vert',
      description:
        "Sal, Santiago, Santo Antão... vibe 100% locale, musique, nature, rencontres réelles.",
      image: '/destinations/cap-vert-home.jpg',
      imageAlt: 'Falaises et chemin côtier du Cap-Vert',
    },
    {
      name: 'Caraïbes',
      slug: 'caraibes',
      description:
        "Martinique, Guadeloupe, plages secrètes, culture créole, rhum & détente absolue.",
      image: '/destinations/caraibes-home.jpg',
      imageAlt: 'Plage paradisiaque des Caraïbes avec palmiers',
    },
    {
      name: 'Colombie',
      slug: 'colombie',
      description:
        "Cartagena, Medellín vibes, îles Rosario, street food, découvertes locales.",
      image: '/destinations/colombie-home.jpg',
      imageAlt: 'Rues colorées de Carthagène, Colombie',
    },
  ];

  return (
    <section id="destinations" className="py-20 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
            Nos destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quatre régions, des expériences authentiques avec des guides locaux pour la Saison 1.
          </p>
        </div>

        {/* Blocs destinations */}
        <div className="space-y-20">
          {destinations.map((destination, index) => (
            <div
              key={destination.slug}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Texte */}
              <div className="flex-1 space-y-4">
                <h3 className="text-4xl font-normal text-gray-900">
                  {destination.name}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {destination.description}
                </p>
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="inline-flex items-center space-x-2 text-gray-900 relative group pb-1"
                >
                  <span>En savoir plus</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 w-full flex justify-center items-center">
                <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={destination.image}
                    alt={destination.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
