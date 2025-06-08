import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes protégées par rôle
const PROTECTED_ROUTES = {
  admin: ["/admin"],
  guide: ["/guide-dashboard", "/guide-profile", "/guide-requests"],
  user: ["/explore", "/messages", "/activities", "/profile"],
  authenticated: ["/onboarding", "/help"],
}

// Routes publiques (pas de vérification)
const PUBLIC_ROUTES = ["/", "/auth", "/signup"]

// API routes publiques
const PUBLIC_API_ROUTES = ["/api/auth/register", "/api/auth/login", "/api/test-register"]

// Fonction simple de vérification de token (sans JWT library)
function isValidToken(token: string): boolean {
  try {
    // Vérification basique : le token doit exister et avoir une longueur raisonnable
    if (!token || token.length < 10) {
      return false
    }

    // Pour une vérification plus poussée, on peut décoder manuellement
    // ou faire un appel à l'API /api/auth/me
    return true
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Laisser passer les routes publiques
  if (PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route))) {
    return NextResponse.next()
  }

  // Laisser passer les API routes publiques
  if (PUBLIC_API_ROUTES.some((route) => path.startsWith(route))) {
    return NextResponse.next()
  }

  // Laisser passer tous les autres appels API (ils géreront leur propre auth)
  if (path.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Laisser passer les assets statiques
  if (path.startsWith("/_next") || path.startsWith("/favicon") || path.includes(".") || path.startsWith("/static")) {
    return NextResponse.next()
  }

  // Vérifier l'authentification pour les routes protégées
  const token = request.cookies.get("auth-token")?.value

  if (!token || !isValidToken(token)) {
    console.log("Middleware: No valid token found, redirecting to auth")
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Pour les routes qui nécessitent une authentification spécifique,
  // on laisse les pages gérer elles-mêmes la vérification du rôle
  // via useAuth hook côté client

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (certaines API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
