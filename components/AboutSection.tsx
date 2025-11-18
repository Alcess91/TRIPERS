import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900">
              Pourquoi
            </h2>
            <Image 
              src="/logo-tripers.svg" 
              alt="TRIPERS" 
              width={300} 
              height={90}
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600 italic font-light">
            Réinventer le voyage en mettant les bonnes personnes sur ton chemin.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12 space-y-6 text-gray-700">
          <p>
            Tout a commencé autour d'un thé à la menthe à Marrakech, dans une ruelle que seuls 
            les locaux connaissent. Ce jour-là, nous avons compris que les meilleurs moments 
            de voyage ne se trouvent pas dans les brochures, mais dans les rencontres authentiques 
            avec ceux qui vivent vraiment le territoire.
          </p>

          <p>
            L'équipe TRIPERS est basée à Paris, mais notre cœur bat au rythme de nos destinations. 
            Nous avons voyagé, exploré, et surtout tissé des liens sincères avec des personnes 
            extraordinaires aux quatre coins du monde.
          </p>

          <p>
            <strong>Notre promesse ?</strong> Ne vous présenter que des guides que nous connaissons 
            personnellement. Pas de plateforme anonyme, pas d'algorithme froid. Juste des humains 
            qui partagent leur territoire avec authenticité et passion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Voyager autrement
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Privilégier la qualité des rencontres à la quantité de sites visités. 
              Prendre le temps de comprendre un lieu à travers ceux qui y vivent vraiment.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Garantir la confiance
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nous ne référençons que des guides que nous connaissons personnellement. 
              Leur intégrité et leur façon de recevoir sont notre seul critère.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Soutenir l'économie locale
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Chaque euro dépensé profite directement aux guides et à leurs communautés. 
              Pas d'intermédiaire anonyme qui capte la valeur, juste un lien direct et équitable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
