import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Pour une application réelle, vous vérifieriez le cookie d'authentification
  // et redirigeriez en fonction du rôle de l'utilisateur

  // En mode démo, nous allons simplement vérifier le chemin
  const path = request.nextUrl.pathname

  // Pages réservées aux guides
  if (path.startsWith("/guide-dashboard") || path.startsWith("/guide-profile")) {
    // En production, vérifiez si l'utilisateur est un guide
    // Pour la démo, nous laissons passer
    return NextResponse.next()
  }

  // Pages réservées aux voyageurs
  if (path === "/explore" || path === "/messages" || path === "/activities") {
    // En production, vérifiez si l'utilisateur est un voyageur
    // Pour la démo, nous laissons passer
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/guide-dashboard/:path*", "/guide-profile/:path*", "/explore", "/messages", "/activities"],
}
