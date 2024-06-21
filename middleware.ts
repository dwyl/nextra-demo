"server only";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

// !!!! DO NOT CHANGE THE NAME OF THE VARIABLE !!!!
// It is manipulated before the project is compiled so it knows all the routes that are private
// according to what is defined in "_meta.json" files.
// See `package.json` and the `private-route-gen` script for context.
const privateRoutesMap: any = {"/reference_api":["user"],"/reference_api/about":["user"],"/reference_api/users":["user"],"/reference_api/mega_private":["cant_enter"],"/reference_api/mega_private/hello":["cant_enter"]};

export default auth(async (req, ctx) => {
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = currentPath in privateRoutesMap

  if(isProtectedRoute) {
    // Check for valid session
    const session = req.auth

    // Redirect unauthed users
    if(!session?.user || !session.user.role) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl))
    }

    // Redirect users that don't have the necessary roles
    const neededRolesForPath = privateRoutesMap[currentPath]
    if(!(session.user.role && neededRolesForPath.includes(session.user.role))) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl))
    }
  }

  return NextResponse.next()

  

});

export const config = {
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
