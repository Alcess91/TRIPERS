// Data structure pour les guides TRIPERS et leur localisation sur la carte

export interface Guide {
  name: string;
  description: string;
}

export interface MapPin {
  id: string;
  city: string;
  country: string;
  position: [number, number]; // [latitude, longitude]
  guides: Guide[];
}

export const guidesMapData: MapPin[] = [
  {
    id: 'marrakech',
    city: 'Marrakech',
    country: 'Maroc',
    position: [31.6295, -7.9811],
    guides: [
      {
        name: 'Omar',
        description: 'Guide passionné qui alterne entre Marrakech et la région d\'Ouzoud. Il vous emmène hors des sentiers battus : villages berbères authentiques, rencontres avec des artisans locaux, et baignades sous les cascades. Son accueil chaleureux et son attention aux détails font toute la différence.',
      },
      {
        name: 'Tarek',
        description: 'Né à Marrakech, Tarek connaît chaque recoin de sa ville. Il crée des parcours sur mesure mêlant souks secrets, ateliers d\'artisans, restaurants locaux et terrasses cachées. Il sait adapter chaque journée à vos envies, que vous cherchiez l\'effervescence de la médina ou le calme des jardins.',
      },
    ],
  },
  {
    id: 'zagora',
    city: 'Zagora',
    country: 'Maroc',
    position: [30.3286, -5.8372],
    guides: [
      {
        name: 'Youssef',
        description: 'Basé à Zagora, aux portes du Sahara, Youssef organise des immersions dans le désert qui allient aventure et confort. Nuits sous les étoiles dans des bivouacs traditionnels, thé partagé avec des nomades, et découverte des oasis cachées. Il veille personnellement à votre sécurité tout en vous offrant l\'expérience authentique du désert.',
      },
    ],
  },
  {
    id: 'sal',
    city: 'Sal',
    country: 'Cap-Vert',
    position: [16.7544, -22.9496],
    guides: [
      {
        name: 'Ismael',
        description: 'Guide exceptionnel parlant 6 langues, Ismael met à l\'aise des voyageurs du monde entier sur l\'île de Sal. Il compose des journées équilibrées entre plages paradisiaques, balades dans les villages de pêcheurs, découverte de la musique capverdienne et rencontres avec les locaux. Son énergie communicative et sa connaissance de l\'archipel en font un compagnon de voyage idéal.',
      },
    ],
  },
  {
    id: 'fort-de-france',
    city: 'Fort-de-France',
    country: 'Martinique',
    position: [14.6415, -61.0242],
    guides: [
      {
        name: 'Patrick',
        description: 'Martiniquais de cœur, Patrick a tissé un réseau solide dans toutes les Antilles. Trilingue (français, anglais, créole), il vous ouvre les portes de la vraie vie caraïbe : plages secrètes, restaurants familiaux où les touristes ne vont jamais, soirées zouk, et rencontres avec des artistes locaux. Ses recommandations sont toujours justes.',
      },
    ],
  },
  {
    id: 'cartagena',
    city: 'Cartagena',
    country: 'Colombie',
    position: [10.3910, -75.4794],
    guides: [
      {
        name: 'Guide local',
        description: 'Découverte de Carthagène et de la côte caraïbe colombienne.',
      },
    ],
  },
  {
    id: 'cairo',
    city: 'Le Caire',
    country: 'Égypte',
    position: [30.0444, 31.2357],
    guides: [
      {
        name: 'Ahmed',
        description: 'Guide professionnel au Caire depuis plus de 10 ans, Ahmed parle 5 langues couramment. Sérieux et ponctuel, il sait équilibrer visites des pyramides et sites emblématiques avec des moments authentiques : cafés fréquentés par les Cairotes, marchés locaux, et quartiers hors des circuits touristiques. Sa passion pour l\'histoire égyptienne est contagieuse.',
      },
    ],
  },
  {
    id: 'dakar',
    city: 'Dakar',
    country: 'Sénégal',
    position: [14.7167, -17.4677],
    guides: [
      {
        name: 'Alpha',
        description: 'Dakarois pur souche, Alpha vous fait découvrir sa ville avec fierté et authenticité. Parlant wolof, français et anglais, il vous emmène de Gorée aux marchés de Sandaga, des maquis où manger le meilleur thieboudienne aux galeries d\'art contemporain. Il connaît les meilleurs spots pour écouter du mbalax et vous présente toujours ses amis.',
      },
    ],
  },
  {
    id: 'mexico',
    city: 'Mexico',
    country: 'Mexique',
    position: [19.4326, -99.1332],
    guides: [
      {
        name: 'Horacio',
        description: 'Mexicain passionné par sa culture, Horacio propose des expériences immersives loin des clichés touristiques. Marchés locaux débordants de couleurs et de saveurs, quartiers résidentiels pleins de vie, ateliers d\'artisans, et cantinas authentiques. Il parle espagnol et anglais, et adore raconter l\'histoire méconnue de son pays autour d\'un mezcal.',
      },
    ],
  },
  {
    id: 'lyon',
    city: 'Lyon',
    country: 'France',
    position: [45.7640, 4.8357],
    guides: [
      {
        name: 'Ali',
        description: 'Coordinateur TRIPERS basé à Lyon, Ali est votre premier contact. Il a voyagé dans toutes nos destinations et connaît personnellement chaque guide. Il vous aide à choisir la destination et le guide les plus adaptés à vos envies, prépare votre itinéraire, et reste disponible pendant votre voyage. C\'est lui qui garantit que tout se passe bien.',
      },
    ],
  },
];
