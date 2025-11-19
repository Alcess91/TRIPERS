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
      "C'est ici que TRIPERS construit des voyages sur mesure. Nous combinons Sal (plages et kitesurf) et Santo Antão (randonnées vertigineuses) selon votre durée et vos envies. Nous sélectionnons les hébergements, organisons les journées avec nos guides, gérons les transferts inter-îles. Le Cap-Vert est un mélange unique de cultures africaine, portugaise et créole. La musique résonne partout : morna et funaná rythment les soirées. Les rencontres avec les locaux se font naturellement. C'est un pays où la notion du temps prend un autre sens, où l'on apprend à vivre au rythme de l'océan et du vent.",
    cities: [
      {
        slug: 'sal',
        name: 'Sal',
        image: '/destinations/sal.jpg',
        description:
          "L'île de Sal, c'est des plages de sable blanc à perte de vue, des eaux turquoise et un vent constant qui attire les kitesurfeurs du monde entier. Santa Maria, le village principal, offre une ambiance décontractée : restaurants de poisson frais, bars en bord de mer, pêcheurs qui rentrent le matin avec leurs prises. Au-delà de la plage, vous découvrez les salines abandonnées (Pedra de Lume), les mirages du désert de sel, la vie locale authentique loin des resorts. Sal, c'est l'île parfaite pour alterner farniente, sports nautiques et découverte d'une culture cap-verdienne chaleureuse.",
        etymology:
          "Le nom 'Sal' vient des anciennes exploitations de sel qui ont fait la richesse de l'île pendant des siècles.",
        guides: [
          {
            id: 'ismael-sal',
            name: 'Ismael',
            city: 'Sal',
            country: 'Cap-Vert',
            description:
              "Ismael est né à Sal. Il connaît chaque plage, chaque spot de kitesurf, chaque restaurant tenu par des locaux. Il vous fait découvrir l'île autrement : villages de pêcheurs, sessions de kite pour débutants ou confirmés, soirées zouk dans des bars où les touristes ne vont jamais. Ismael parle français, anglais, portugais et créole. Avec lui, Sal n'est pas qu'une carte postale, c'est une vraie immersion.",
          },
        ],
      },
      {
        slug: 'santo-antao',
        name: 'Santo Antão',
        image: '/destinations/santoantao.jpg',
        description:
          "Santo Antão, c'est l'île des randonneurs. Des sentiers vertigineux bordent les falaises qui plongent dans l'océan. Des vallées verdoyantes (Paúl, Ribeira Grande) contrastent avec des paysages lunaires. Vous marchez entre bananiers, papayers et champs de canne à sucre, croisant des villageois qui travaillent la terre à la main. Les routes en lacets offrent des panoramas à couper le souffle. Les petits villages perchés vous accueillent pour un grogue (rhum local) et des conversations en créole. Santo Antão, c'est le Cap-Vert nature, brut, généreux. Idéal pour ceux qui aiment marcher, observer, prendre leur temps.",
        etymology:
          "Santo Antão signifie Saint Antoine en portugais, en l'honneur de saint Antoine de Padoue.",
        guides: [],
      },
    ],
  },
  {
    slug: 'caraibes',
    countryName: 'Caraïbes',
    heroImage: '/destinations/caraibes-hero.jpg',
    intro:
      "L'archipel des Antilles s'étend sur des milliers de kilomètres entre l'Amérique du Nord et l'Amérique du Sud. Entre plages paradisiaques, forêts tropicales et villes colorées, les Caraïbes offrent une diversité culturelle et naturelle unique. Influences africaines, européennes et amérindiennes se mêlent dans la langue, la cuisine, la musique.",
    story:
      "C'est ici que TRIPERS construit des voyages sur mesure dans les Antilles. Nous connaissons les îles, les bonnes adresses, les plages secrètes. Nous organisons les traversées en bateau, les hébergements chez l'habitant ou en villa, les sorties avec nos guides locaux. Vous profitez, nous gérons le reste. Les Caraïbes, c'est une mosaïque d'îles. La Martinique, la Guadeloupe, la Dominique, Sainte-Lucie... chacune a son identité créole. Les marchés débordent de fruits exotiques. Les plages alternent entre sable blanc et sable noir volcanique. Le zouk et le reggae accompagnent les fins de journée. On vient pour la mer, on reste pour l'art de vivre.",
    cities: [
      {
        slug: 'fort-de-france',
        name: 'Fort-de-France',
        image: '/destinations/fortdefrance.jpg',
        description:
          "Fort-de-France est la capitale de la Martinique. Située au bord d'une large baie, la ville mêle architecture coloniale, marchés animés et quartiers modernes. Le marché couvert déborde de couleurs et d'odeurs : mangues, christophines, épices, rhum arrangé. La bibliothèque Schoelcher, avec sa structure métallique, rappelle l'héritage colonial. Les rues commerçantes vibrent au rythme créole. C'est la porte d'entrée pour explorer le reste de l'île : les plages du sud, la montagne Pelée au nord, les distilleries de rhum à l'est.",
        etymology:
          "Le nom vient de l'ancien fort français qui protégeait la baie, baptisé Fort-Royal puis Fort-de-France après la Révolution.",
        guides: [
          {
            id: 'patrick-martinique',
            name: 'Patrick',
            city: 'Fort-de-France',
            country: 'Martinique (Caraïbes)',
            description:
              "Martiniquais de naissance, Patrick parle français, anglais et créole avec la même aisance. Il connaît toutes les Antilles : Martinique, Guadeloupe, Dominique, Sainte-Lucie. Avec lui, vous découvrez les plages secrètes accessibles seulement par bateau, les restaurants familiaux où l'on mange du colombo et du blaff, les soirées zouk dans des bars sans touristes. Patrick ne suit pas un programme figé, il adapte selon la météo, votre humeur, les événements locaux. Il vous fait vivre les Caraïbes de l'intérieur.",
          },
        ],
      },
      {
        slug: 'autres-iles',
        name: 'Autres îles des Antilles',
        image: '/destinations/lesantilles.jpg',
        description:
          "Au-delà de la Martinique, les Antilles regorgent d'îles aux personnalités distinctes. La Guadeloupe, avec ses deux ailes reliées par un pont, mêle plages tranquilles et volcans actifs. La Dominique, surnommée l'île nature, offre des cascades, des sources chaudes, une jungle dense. Sainte-Lucie se distingue par ses pitons rocheux qui plongent dans la mer. Chaque île a sa propre ambiance, sa propre cuisine, son propre rythme. On peut naviguer de l'une à l'autre, ou s'installer sur une seule et prendre son temps.",
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
      "C'est ici que TRIPERS construit des voyages sur mesure. Nous combinons Marrakech, les cascades d'Ouzoud et le désert de Zagora selon vos envies et votre durée. Nous sélectionnons les hébergements, organisons les journées avec nos guides, et veillons à ce que les transitions soient fluides. Vous profitez, nous gérons le reste. Voyager au Maroc, c'est passer d'une médina animée aux silences du désert, grimper dans les vallées de l'Atlas et redescendre vers les plages d'Essaouira. Les couleurs des souks, les odeurs des épices, les appels à la prière et les thés à la menthe rythment les journées. Le Maroc est un pays de contrastes où tradition et modernité coexistent.",
    cities: [
      {
        slug: 'marrakech',
        name: 'Marrakech',
        image: '/destinations/marrakech.png',
        description:
          "Marrakech, c'est la place Jemaa el-Fna qui s'anime à la tombée de la nuit : conteurs, musiciens, stands de jus d'orange. C'est les souks où se perdre entre cuir, épices et tapis. Les riads cachés derrière des portes anonymes, les jardins Majorelle d'un bleu irréel, les terrasses où siroter un thé à la menthe en regardant l'Atlas au loin. Au-delà des clichés, Marrakech est aussi une ville moderne : quartiers du Guéliz et de l'Hivernage, restaurants fusion, rooftops branchés. Avec nos guides, vous découvrez les deux visages : la médina traditionnelle et la ville contemporaine.",
        etymology:
          "Le nom Marrakech vient du berbère Mur n Akush (terre de Dieu). C'est aussi de cette ville que vient le mot Maroc.",
        guides: [
          {
            id: 'omar-marrakech',
            name: 'Omar',
            city: 'Marrakech / Ouzoud',
            country: 'Maroc',
            description:
              "Guide passionné qui connaît Marrakech et la région d'Ouzoud par cœur. À Marrakech, il vous emmène hors des sentiers battus : ateliers d'artisans (dinandiers, maroquiniers), fours à pain de quartier, maisons de thé où les locaux discutent pendant des heures. Omar parle français couramment et s'adapte à votre rythme.",
          },
          {
            id: 'tarek-marrakech',
            name: 'Tarek',
            city: 'Marrakech',
            country: 'Maroc',
            description:
              "Né à Marrakech, Tarek en connaît chaque ruelle, chaque secret. Il construit des itinéraires sur mesure : souks cachés où les touristes ne vont jamais, terrasses pour admirer le coucher de soleil sur l'Atlas, ateliers d'artisans qu'il fréquente depuis l'enfance. Avec lui, Marrakech devient une ville familière, pas un décor de carte postale.",
          },
        ],
      },
      {
        slug: 'ouzoud',
        name: 'Ouzoud',
        image: '/destinations/ouzoud.jpg',
        description:
          "À deux heures de route de Marrakech, la vallée d'Ouzoud vous plonge dans un Maroc vert, loin du tumulte de la ville. Les cascades dévalent sur 110 mètres au milieu des oliviers et des figuiers de Barbarie. En bas, l'eau fraîche invite à la baignade. Le long du sentier, vous croisez des singes magots qui vivent ici en liberté. Le soir, l'appel à la prière résonne depuis les villages berbères perchés sur les hauteurs. C'est une respiration nature à quelques heures seulement de Marrakech.",
        etymology:
          "Ouzoud signifie meunerie en berbère, en référence aux anciens moulins à grain qui utilisaient la force de l'eau.",
        guides: [
          {
            id: 'omar-ouzoud',
            name: 'Omar',
            city: 'Marrakech / Ouzoud',
            country: 'Maroc',
            description:
              "À Ouzoud, Omar vous fait découvrir les villages berbères authentiques où ses grands-parents ont grandi. Il connaît chaque sentier qui longe les cascades, chaque artisan qui tisse encore à la main, chaque famille qui prépare le pain dans un four en terre. Avec lui, vous ne visitez pas Ouzoud depuis l'extérieur, vous entrez dans son quotidien. Il adapte le rythme selon vos envies : baignade sous les chutes, repas chez l'habitant, ou simplement marcher en silence dans la vallée.",
          },
        ],
      },
      {
        slug: 'zagora',
        name: 'Zagora',
        image: '/destinations/zagora.jpeg',
        description:
          "Zagora marque l'entrée dans le désert du Sahara. Dès que vous quittez la ville, les palmeraies cèdent la place aux étendues ocre. Les dunes de Tinfou apparaissent au loin. Le soir, vous dormez en bivouac sous un ciel saturé d'étoiles, sans pollution lumineuse. Le matin, vous vous réveillez avec le silence du désert. Entre deux dunes, vous croisez parfois des familles nomades qui vivent encore ici avec leurs troupeaux. Zagora, c'est l'immensité brute, sans filtre, sans décor ajouté.",
        etymology:
          "Zagora pourrait venir du berbère Tazagourt, qui signifie sommet ou colline, en référence au djebel Zagora qui domine la région.",
        guides: [
          {
            id: 'youssef-zagora',
            name: 'Youssef',
            city: 'Zagora',
            country: 'Maroc',
            description:
              "Youssef a grandi à Zagora, aux portes du Sahara. Il organise des bivouacs traditionnels sous les étoiles, loin des camps touristiques. Avec lui, vous partagez le thé à la menthe avec des familles nomades, vous dormez dans des tentes berbères authentiques, vous apprenez à lire les constellations. Youssef parle peu, mais il sait écouter. Il veille à votre confort sans jamais forcer l'expérience. Le désert avec lui, c'est un silence habité, pas un spectacle.",
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
      "La Colombie s'étend entre deux océans, traverse la cordillère des Andes et plonge dans la forêt amazonienne. Côtes caribéennes aux eaux chaudes, villes coloniales colorées, vallées verdoyantes, métropoles vibrantes. C'est un pays de diversité extrême. La Colombie moderne a tourné la page des conflits passés et s'ouvre au monde avec énergie.",
    story:
      "C'est ici que TRIPERS construit des voyages sur mesure en Colombie. Nous combinons Cartagena, Medellín, la région du café, la côte Pacifique selon votre durée et vos envies. Nous organisons les vols intérieurs, les hébergements, les journées avec nos guides locaux. Vous profitez, nous gérons le reste. Cartagena, avec ses rues pavées et ses façades ocre, incarne le charme colonial caribéen. Medellín, nichée dans sa vallée, représente la transformation urbaine et l'innovation. Bogotá mêle gratte-ciel, street art et quartiers historiques. Plus loin, les paysages du café, les villages de Salento et la côte Pacifique offrent d'autres visages. La salsa, la cumbia et le vallenato accompagnent chaque moment. L'accueil est chaleureux. On repart avec des histoires.",
    cities: [
      {
        slug: 'cartagena',
        name: 'Cartagena',
        image: '/destinations/cartagena.jpeg',
        description:
          "Cartagena de Indias est une ville coloniale flamboyante au bord de la mer des Caraïbes. Remparts massifs, balcons fleuris, places animées, ruelles colorées : c'est l'une des villes les plus photogéniques d'Amérique du Sud. Le centre historique est un labyrinthe de charme où chaque coin révèle une église, une placita, un patio caché. Le quartier de Getsemaní vibre au rythme de la cumbia, du street art, des bars à ciel ouvert. Les îles du Rosaire, à 45 minutes en bateau, offrent des plages de carte postale et des eaux cristallines. Cartagena, c'est la chaleur caribéenne, l'histoire coloniale, et l'énergie colombienne réunies en un seul endroit.",
        etymology:
          "La ville porte le nom de Carthagène en Espagne, d'où venaient plusieurs de ses fondateurs espagnols au XVIe siècle.",
        guides: [
          {
            id: 'horacio-cartagena',
            name: 'Horacio',
            city: 'Cartagena',
            country: 'Colombie',
            description:
              "Horacio est né à Cartagena. Il connaît chaque rue du centre historique, chaque artisan de Getsemaní, chaque cantina où l'on boit du ron au son de la cumbia. Avec lui, vous ne faites pas le tour des monuments, vous entrez dans le quotidien de la ville. Il vous emmène au marché de Bazurto dès 6h du matin, dans les ateliers où l'on fabrique encore les hamacs à la main, dans les bars de salsa fréquentés par les Cartagéneros. Horacio parle vite, rit fort, et transforme chaque sortie en récit vivant de l'histoire caribéenne.",
          },
        ],
      },
      {
        slug: 'medellin',
        name: 'Medellín',
        image: '/destinations/medellin.jpeg',
        description:
          "Medellín, surnommée la ville du printemps éternel pour son climat doux toute l'année, s'étend dans une vallée entourée de montagnes. Autrefois marquée par une histoire difficile, la ville s'est transformée en modèle d'innovation urbaine et sociale. Les quartiers de El Poblado et Laureles regorgent de restaurants, cafés, bars, galeries d'art. Les téléphériques publics montent dans les barrios périphériques et offrent une vue panoramique sur toute la vallée. La Comuna 13, anciennement zone interdite, est devenue un symbole de renaissance avec ses escaliers mécaniques, ses fresques géantes, ses ateliers de hip-hop. Medellín, c'est une ville en mouvement permanent, jeune, moderne, résiliente.",
        etymology:
          "Medellín doit son nom à Medellín en Espagne, ville natale de Pedro Portocarrero, gouverneur de la région au moment de sa fondation en 1616.",
        guides: [
          {
            id: 'horacio-medellin',
            name: 'Horacio',
            city: 'Medellín',
            country: 'Colombie',
            description:
              "À Medellín, Horacio vous raconte la transformation de la ville à travers ses propres souvenirs. Il vous emmène dans la Comuna 13 où il connaît les artistes qui ont peint les fresques, dans les cafés de El Poblado où l'on torréfie encore le café à la main, dans les miradors panoramiques au coucher du soleil. Le soir, il vous fait découvrir la salsa en live dans des bars de Laureles où dansent les Paisas (habitants de Medellín). Horacio est passionné, bavard, et transforme chaque visite en plongée dans l'âme de cette ville résiliente.",
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
