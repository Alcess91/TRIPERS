import { NextRequest, NextResponse } from 'next/server';

// Interface pour les candidatures de guide
interface GuideApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  country: string;
  yearsAsGuide: string;
  yearsInCity: string;
  languages: string[];
  specialties: string[];
  motivation: string;
  hasReferences: boolean;
  acceptsTerms: boolean;
  status: 'en_attente' | 'approuve' | 'rejete';
  submittedAt: string;
}

// Stockage temporaire en mémoire (en attendant la DB)
let applications: GuideApplication[] = [
  {
    id: '1',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.com',
    phone: '0123456789',
    dateOfBirth: '1988-07-12',
    city: 'Paris',
    country: 'France',
    yearsAsGuide: '4',
    yearsInCity: '12',
    languages: ['Français', 'Anglais'],
    specialties: ['Histoire', 'Art'],
    motivation: 'Passionnée d\'art et d\'histoire, je guide depuis 4 ans dans les musées parisiens.',
    hasReferences: true,
    acceptsTerms: true,
    status: 'en_attente',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Thomas',
    lastName: 'Leroy',
    email: 'thomas.leroy@example.com',
    phone: '0987654321',
    dateOfBirth: '1985-03-22',
    city: 'Lyon',
    country: 'France',
    yearsAsGuide: '6',
    yearsInCity: '18',
    languages: ['Français', 'Anglais', 'Italien'],
    specialties: ['Gastronomie', 'Architecture'],
    motivation: 'Guide gastronomique certifié, je fais découvrir la richesse culinaire lyonnaise.',
    hasReferences: true,
    acceptsTerms: true,
    status: 'approuve',
    submittedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Dubois',
    email: 'emma.dubois@example.com',
    phone: '0654321987',
    dateOfBirth: '1992-11-05',
    city: 'Nice',
    country: 'France',
    yearsAsGuide: '2',
    yearsInCity: '8',
    languages: ['Français', 'Anglais', 'Espagnol'],
    specialties: ['Nature', 'Plage'],
    motivation: 'Amoureuse de la Côte d\'Azur, je partage ma passion pour notre belle région.',
    hasReferences: false,
    acceptsTerms: true,
    status: 'rejete',
    submittedAt: '2024-01-08T09:15:00Z'
  }
];

// POST - Nouvelle candidature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des champs requis
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth',
      'city', 'country', 'yearsAsGuide', 'yearsInCity', 'languages',
      'specialties', 'motivation', 'hasReferences', 'acceptsTerms'
    ];
    
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== false) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }
    
    // Validation des termes
    if (!body.acceptsTerms) {
      return NextResponse.json(
        { error: 'Vous devez accepter les conditions générales' },
        { status: 400 }
      );
    }
    
    // Créer la nouvelle candidature
    const newApplication: GuideApplication = {
      id: (applications.length + 1).toString(),
      ...body,
      status: 'en_attente',
      submittedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    
    console.log('✅ Nouvelle candidature guide reçue:', newApplication.id);
    
    return NextResponse.json({
      message: 'Candidature soumise avec succès',
      applicationId: newApplication.id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// GET - Liste des candidatures (pour l'admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredApplications = applications;
    
    if (status && ['en_attente', 'approuve', 'rejete'].includes(status)) {
      filteredApplications = applications.filter(app => app.status === status);
    }
    
    return NextResponse.json(filteredApplications, { status: 200 });
    
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
