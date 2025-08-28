import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, reviewComments } = await request.json()
    const applicationId = params.id

    // Validation
    if (!['approuve', 'rejete'].includes(status)) {
      return NextResponse.json(
        { message: 'Statut invalide' },
        { status: 400 }
      )
    }

    // TODO: Mettre à jour dans la base de données
    console.log(`🔄 Mise à jour candidature ${applicationId}:`, {
      status,
      reviewComments,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'admin' // TODO: récupérer l'ID de l'admin connecté
    })

    // TODO: Si approuvé, créer le compte guide et envoyer email de bienvenue
    // TODO: Si rejeté, envoyer email de notification
    
    if (status === 'approuve') {
      console.log('📧 Envoi email de bienvenue au nouveau guide')
      // TODO: Créer le compte guide dans la table users
      // TODO: Configurer le profil guide
    } else {
      console.log('📧 Envoi email de rejet avec commentaires')
    }

    return NextResponse.json({
      message: `Candidature ${status === 'approuve' ? 'approuvée' : 'rejetée'} avec succès`,
      applicationId,
      newStatus: status
    })

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const applicationId = params.id

    // TODO: Récupérer depuis la base de données
    const mockApplication = {
      id: applicationId,
      email: 'marie.dubois@gmail.com',
      firstName: 'Marie',
      lastName: 'Dubois',
      status: 'en_attente',
      submittedAt: new Date().toISOString()
    }

    return NextResponse.json({
      application: mockApplication
    })

  } catch (error) {
    console.error('❌ Erreur lors de la récupération:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
