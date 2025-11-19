import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS } from '@/lib/destinations';
import type { Destination } from '@/lib/types';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return DESTINATIONS.map((destination: Destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const destination = DESTINATIONS.find((d: Destination) => d.slug === params.slug);
  
  if (!destination) {
    return {
      title: 'Destination non trouvée - TRIPERS',
    };
  }

  return {
    title: `${destination.countryName} - TRIPERS`,
    description: destination.intro,
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = DESTINATIONS.find((d: Destination) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={destination.heroImage}
          alt={destination.countryName}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {destination.countryName}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            {destination.intro}
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            {destination.story}
          </p>
        </div>

        {/* Cities Section - Horizontal Layout */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Nos villes</h2>
          <div className="space-y-16">
            {destination.cities.map((city: any, index: number) => (
              <div key={city.name} className="space-y-6">
                {/* Photo + Ville */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative w-full md:w-1/3 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {city.name}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {city.description}
                    </p>
                  </div>
                </div>

                {/* Étymologie */}
                {city.etymology && (
                  <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-yellow-400">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                      Étymologie
                    </h4>
                    <p className="text-gray-700 italic">
                      {city.etymology}
                    </p>
                  </div>
                )}

                {/* Guides */}
                {city.guides.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Guide{city.guides.length > 1 ? 's' : ''} TRIPERS
                    </h4>
                    <div className="space-y-4">
                      {city.guides.map((guide: any) => (
                        <div key={guide.id} className="border-l-4 border-yellow-400 pl-4">
                          <p className="font-semibold text-gray-900 mb-1">{guide.name}</p>
                          <p className="text-gray-600 leading-relaxed">{guide.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Séparateur entre les villes */}
                {index < destination.cities.length - 1 && (
                  <hr className="border-gray-200 my-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA WhatsApp */}
        <div className="text-center mb-12 py-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vous voulez construire votre voyage ici ?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Contactez-nous sur WhatsApp. Indiquez vos dates, votre budget, ce qui vous attire. Nous construisons ensemble un voyage sur mesure avec nos guides locaux. Réponse personnalisée sous 24h.
          </p>
          <a
            href="https://wa.me/212608836531"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-green-600 font-medium border-2 border-green-600 hover:bg-green-50 transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Contactez-nous sur WhatsApp</span>
          </a>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/#destinations"
            className="inline-flex items-center space-x-2 text-gray-900 relative group pb-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Retour aux destinations</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
