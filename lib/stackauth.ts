import { createRemoteJWKSet, jwtVerify } from "jose"

const jwksUrl = process.env.STACK_JWKS_URL!
const JWKS = createRemoteJWKSet(new URL(jwksUrl))

export interface AuthPayload {
  sub: string
  email?: string
  name?: string
  picture?: string
}

export async function verifyStackToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWKS, { algorithms: ["RS256"] })
    return payload as AuthPayload
  } catch (e) {
    console.error("verifyStackToken error:", (e as Error).message)
    return null
  }
}
