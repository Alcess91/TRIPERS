export type GuideRef = {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
};

export type City = {
  slug: string;
  name: string;
  image: string;
  description: string;
  etymology?: string;
  guides: GuideRef[];
};

export type Destination = {
  slug: string;
  countryName: string;
  heroImage: string;
  intro: string;
  story: string;
  cities: City[];
};

export const DESTINATIONS: Destination[] = [
  {
    slug: 'cap-vert',
    countryName: 'Cap-Vert',
    heroImage: '/destinations/cap-vert-hero.jpg',
    intro:
      "L'archipel du Cap-Vert se compose de dix îles volcaniques situées dans l'océan Atlantique, à environ 570 km des côtes africaines. Entre plages de sable blanc, paysages lunaires et montagnes verdoyantes, chaque île possède son identité propre.",
    story:
      "Le Cap-Vert est un mélange unique de cultures africaine, portugaise et créole. De l'île de Santo Antão et ses sentiers de randonnée vertigineux à Sal et ses plages infinies, l'archipel offre des contrastes saisissants. La musique résonne partout, la morna et le funaná rythment les soirées, et les rencontres avec les locaux se font naturellement. C'est un pays où la notion du temps prend un autre sens, où l'on apprend à vivre au rythme de l'océan et du vent.",
    cities: [
      {
        slug: 'sal',
        name: 'Sal',
        image: '/destinations/sal.jpg',
        description:
          "L'île de Sal est connue pour ses longues plages de sable blanc, ses eaux turquoise et son vent constant qui attire les amateurs de sports nautiques. Santa Maria, le village principal, offre une ambiance décontractée entre restaurants de poisson frais, bars en bord de mer et rencontres avec les pêcheurs locaux. Au-delà de la plage, on découvre les salines abandonnées, les mirages du désert de sel et une vie locale authentique.",
        etymology:
          "Le nom 'Sal' vient des anciennes exploitations de sel qui ont fait la richesse de l'île pendant des siècles.",
        guides: [
          {
            id: 'ismael-sal',
            name: 'Ismael',
            city: 'Sal',
            country: 'Cap-Vert',
            description:
              "Polyglotte parlant six langues, Ismael accueille des voyageurs du monde entier sur l'île de Sal. Il construit des journées équilibrées entre plages de sable blanc, villages de pêcheurs et immersion dans la musique cap-verdienne. Son sourire permanent et sa douceur mettent à l'aise dès les premières minutes.",
          },
        ],
      },
      {
        slug: 'santo-antao',
        name: 'Santo Antão',
        image: '/destinations/santoantao.jpg',
        description:
          "Santo Antão est l'île des randonneurs. Ses vallées profondes, ses pics rocheux et ses sentiers en balcon offrent des panoramas spectaculaires sur l'océan. Les villages perchés cultivent la canne à sucre et le café, et l'accueil y est chaleureux. C'est une île pour ceux qui cherchent la nature, l'effort physique et l'immersion totale.",
        etymology:
          "L'île porte le nom de Saint Antoine, saint patron des marins portugais qui l'ont découverte.",
        guides: [],
      },
    ],
  },
  {
    slug: 'caraibes',
    countryName: 'Caraïbes',
    heroImage: '/destinations/caraibes-hero.jpg',
    intro:
      "L'archipel des Antilles s'étend sur des milliers de kilomètres entre l'Amérique du Nord et l'Amérique du Sud. Entre plages paradisiaques, forêts tropicales et villes colorées, les Caraïbes offrent une diversité culturelle et naturelle unique, mêlant influences africaines, européennes et amérindiennes.",
    story:
      "Les Caraïbes, c'est une mosaïque d'îles où chaque destination a son caractère. La Martinique, la Guadeloupe, la Dominique, Sainte-Lucie… chacune possède sa propre identité créole. Les marchés débordent de fruits exotiques, les plages alternent entre sable blanc et sable noir volcanique, et la musique zouk ou reggae accompagne les fins de journée. On y vient pour la mer, mais on reste pour les rencontres et l'art de vivre.",
    cities: [
      {
        slug: 'fort-de-france',
        name: 'Fort-de-France',
        image: '/destinations/fortdefrance.jpg',
        description:
          "Fort-de-France est la capitale de la Martinique. Située au bord d'une large baie, la ville mêle architecture coloniale, marchés animés et quartiers modernes. Le marché couvert, la bibliothèque Schoelcher et les rues commerçantes offrent un aperçu vivant de la culture martiniquaise. C'est aussi une porte d'entrée idéale pour explorer le reste de l'île et les îles voisines.",
        etymology:
          "Le nom vient de l'ancien fort français qui protégeait la baie, baptisé Fort-Royal puis Fort-de-France après la Révolution.",
        guides: [
          {
            id: 'patrick-martinique',
            name: 'Patrick',
            city: 'Fort-de-France',
            country: 'Martinique (Caraïbes)',
            description:
              "Martiniquais de naissance, Patrick parle français, anglais et créole avec la même aisance. Basé à Fort-de-France, il possède un réseau solide dans toutes les Antilles. Il vous emmène sur des plages secrètes, dans des restaurants familiaux où l'on mange comme chez soi, et termine les soirées au son du zouk dans des lieux authentiques.",
          },
        ],
      },
      {
        slug: 'autres-iles',
        name: 'Autres îles des Antilles',
        image: '/destinations/lesantilles.jpg',
        description:
          "Au-delà de la Martinique, les Antilles regorgent d'îles aux personnalités distinctes. La Guadeloupe et ses deux ailes, la Dominique et sa nature sauvage, Sainte-Lucie et ses pitons rocheux… chaque île mérite qu'on s'y attarde. Les possibilités de navigation, de randonnée et de découverte culturelle sont infinies.",
        guides: [],
      },
    ],
  },
  {
    slug: 'maroc',
    countryName: 'Maroc',
    heroImage: '/destinations/maroc-hero.jpg',
    intro:
      "Le Maroc se déploie entre la mer Méditerranée, l'océan Atlantique, les montagnes de l'Atlas et les étendues du Sahara. Carrefour entre l'Afrique et l'Europe, le pays offre une diversité de paysages, de cultures et d'ambiances. Des médinas millénaires aux stations balnéaires modernes, chaque région possède son identité.",
    story:
      "Voyager au Maroc, c'est passer d'une médina animée de Marrakech aux silences du désert de Zagora, grimper dans les vallées de l'Atlas et redescendre vers les plages d'Essaouira. Les couleurs des souks, les odeurs des épices, les appels à la prière et les thés à la menthe rythment les journées. Le Maroc est un pays de contrastes où tradition et modernité coexistent, où chaque ville raconte une histoire différente.",
    cities: [
      {
        slug: 'marrakech',
        name: 'Marrakech',
        image: '/destinations/marrakech.png',
        description:
          "Marrakech, la ville rouge, est un tourbillon sensoriel. La place Jemaa el-Fna s'anime dès le coucher du soleil avec ses conteurs, musiciens et étals de nourriture. Les souks labyrinthiques regorgent d'artisanat, les riads cachent des jardins secrets, et les montagnes de l'Atlas offrent une échappée belle à quelques kilomètres. Marrakech est intense, fascinante et ne laisse personne indifférent.",
        etymology:
          "Le nom 'Marrakech' viendrait du berbère 'Mur n Akush', signifiant 'Terre de Dieu', ou d'une déformation de 'Marrakush', lié aux remparts rouges de la ville.",
        guides: [
          {
            id: 'omar-marrakech',
            name: 'Omar',
            city: 'Marrakech / Ouzoud',
            country: 'Maroc',
            description:
              "Guide passionné qui alterne entre Marrakech et la région d'Ouzoud. Il vous emmène hors des sentiers battus : villages berbères authentiques, rencontres avec des artisans locaux, et baignades sous les cascades. Omar connaît chaque recoin de l'Atlas et sait adapter le rythme selon vos envies.",
          },
          {
            id: 'tarek-marrakech',
            name: 'Tarek',
            city: 'Marrakech',
            country: 'Maroc',
            description:
              "Né à Marrakech, Tarek en connaît chaque ruelle, chaque secret. Il construit des itinéraires sur mesure : souks cachés où les touristes ne vont jamais, terrasses pour admirer le coucher de soleil, ateliers d'artisans qu'il fréquente depuis l'enfance. Avec lui, Marrakech devient une ville familière.",
          },
        ],
      },
      {
        slug: 'ouzoud',
        name: 'Ouzoud',
        image: '/destinations/ouzoud.jpg',
        description:
          "Les cascades d'Ouzoud, situées dans le Moyen Atlas à environ 150 km de Marrakech, comptent parmi les plus spectaculaires du Maroc. L'eau dévale sur plus de 100 mètres dans un écrin de verdure, entouré de villages berbères et d'oliviers. Les sentiers permettent de descendre jusqu'au pied des chutes, et les singes magots accompagnent souvent les visiteurs. C'est une parenthèse nature idéale.",
        etymology:
          "Le mot 'Ouzoud' signifie 'meunerie' en berbère, en référence aux anciens moulins à grain qui utilisaient la force de l'eau.",
        guides: [
          {
            id: 'omar-ouzoud',
            name: 'Omar',
            city: 'Marrakech / Ouzoud',
            country: 'Maroc',
            description:
              "Guide passionné qui alterne entre Marrakech et la région d'Ouzoud. Il vous emmène hors des sentiers battus : villages berbères authentiques, rencontres avec des artisans locaux, et baignades sous les cascades. Omar connaît chaque recoin de l'Atlas et sait adapter le rythme selon vos envies.",
          },
        ],
      },
      {
        slug: 'zagora',
        name: 'Zagora',
        image: '/destinations/zagora.jpeg',
        description:
          "Zagora marque l'entrée dans le désert du Sahara. La ville elle-même est un point de départ vers les dunes de Tinfou et les bivouacs sous les étoiles. Au-delà de l'expérience saharienne, Zagora offre un aperçu de la vie des communautés nomades, des palmeraies et des ksour (villages fortifiés). C'est une destination pour ceux qui cherchent le silence, l'immensité et le dépaysement total.",
        etymology:
          "Le nom 'Zagora' pourrait venir du berbère 'Tazagourt', signifiant 'sommet' ou 'colline', en référence au djebel Zagora qui domine la région.",
        guides: [
          {
            id: 'youssef-zagora',
            name: 'Youssef',
            city: 'Zagora',
            country: 'Maroc',
            description:
              "Basé à Zagora, aux portes du désert, Youssef organise des bivouacs traditionnels sous les étoiles. Il vous fait découvrir les oasis cachées, partager le thé avec des nomades, et comprendre le Sahara au-delà des clichés. Discret et attentionné, il veille à votre sécurité tout en préservant l'authenticité de l'expérience.",
          },
        ],
      },
    ],
  },
  {
    slug: 'colombie',
    countryName: 'Colombie',
    heroImage: '/destinations/colombie-hero.jpg',
    intro:
      "La Colombie s'étend entre deux océans, traverse la cordillère des Andes et plonge dans la forêt amazonienne. C'est un pays de diversité extrême : côtes caribéennes aux eaux chaudes, villes coloniales colorées, vallées verdoyantes et métropoles vibrantes. La Colombie moderne a tourné la page des conflits passés et s'ouvre au monde avec énergie.",
    story:
      "Cartagena, avec ses rues pavées et ses façades ocre, incarne le charme colonial. Medellín, nichée dans sa vallée, représente la transformation urbaine et l'innovation. Bogotá mêle gratte-ciel, street art et quartiers historiques. Plus loin, les paysages du café, les villages de Salento et la côte Pacifique offrent d'autres visages. La Colombie est un pays où la musique salsa, cumbia et vallenato accompagne chaque moment, où l'accueil est chaleureux et où l'on repart avec des histoires.",
    cities: [
      {
        slug: 'cartagena',
        name: 'Cartagena',
        image: '/destinations/cartagena.jpeg',
        description:
          "Cartagena de Indias est une ville coloniale flamboyante au bord de la mer des Caraïbes. Ses remparts, ses balcons fleuris, ses places animées et ses ruelles colorées en font l'une des villes les plus photogéniques d'Amérique du Sud. Le centre historique est un labyrinthe de charme, tandis que le quartier de Getsemaní vibre au rythme de la musique et du street art. Les plages des îles voisines offrent une échappée tropicale à quelques minutes en bateau.",
        etymology:
          "La ville porte le nom de Carthagène en Espagne, d'où venaient plusieurs de ses fondateurs espagnols au XVIe siècle.",
        guides: [
          {
            id: 'horacio-cartagena',
            name: 'Horacio',
            city: 'Cartagena',
            country: 'Colombie',
            description:
              "Passionné par la culture colombienne, Horacio propose des expériences immersives au-delà des clichés touristiques. Il vous emmène dans les marchés locaux de Getsemaní, les ateliers d'artisans du centre historique, et les cantinas authentiques où l'on boit du ron au son de la cumbia. Chaque sortie devient un récit vivant de l'histoire et de l'âme caribéenne de Cartagena.",
          },
        ],
      },
      {
        slug: 'medellin',
        name: 'Medellín',
        image: '/destinations/medellin.jpeg',
        description:
          "Medellín, surnommée la 'ville du printemps éternel' pour son climat doux, s'étend dans une vallée entourée de montagnes. Autrefois marquée par une histoire difficile, la ville s'est transformée en un modèle d'innovation urbaine et sociale. Les quartiers de El Poblado et Laureles offrent restaurants, cafés et vie nocturne, tandis que les téléphériques permettent de monter dans les barrios et de découvrir des projets artistiques comme la Comuna 13. Medellín est une ville en mouvement, moderne et attachante.",
        etymology:
          "Medellín doit son nom à Medellín en Espagne, ville natale de Pedro Portocarrero, gouverneur de la région au moment de sa fondation en 1616.",
        guides: [
          {
            id: 'horacio-medellin',
            name: 'Horacio',
            city: 'Medellín',
            country: 'Colombie',
            description:
              "Passionné par la culture colombienne, Horacio propose des expériences immersives au-delà des clichés touristiques. Il vous fait découvrir la transformation de Medellín à travers la Comuna 13, les cafés de El Poblado, et les miradors panoramiques. Amateur de salsa et de café, il partage son amour pour cette ville résiliente avec une énergie contagieuse.",
          },
        ],
      },
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((dest) => dest.slug === slug);
}

export function getCityBySlug(
  destinationSlug: string,
  citySlug: string
): City | undefined {
  const destination = getDestinationBySlug(destinationSlug);
  return destination?.cities.find((city) => city.slug === citySlug);
}
