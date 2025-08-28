import { NextRequest, NextResponse } from "next/server"

// MIDDLEWARE TEMPORAIREMENT DÉSACTIVÉ pour debug
// Le problème : les cookies ne sont jamais visibles dans le middleware
// Solution temporaire : laisser passer toutes les routes pour tester

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(`🛡️  Middleware: ${pathname} (DÉSACTIVÉ pour debug)`)
  
  // Laisser passer TOUTES les routes pour l'instant
  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
