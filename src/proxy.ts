// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname

//     const isPublicPath = path === '/login' || path === '/signup'

//     const token = request.cookies.get('token')?.value || ''

//     if(isPublicPath && token){
//         return NextResponse.redirect(new URL('/', request.nextUrl))
//     }

//     if(!isPublicPath && !token){
//         return NextResponse.redirect(new URL('/login', request.nextUrl))
//     }
// }
 

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/login',
//     '/signup',
//   ]
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Changed function name from middleware to proxy
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Fixed: Added leading slash to '/login'
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    // If user is authenticated and tries to access login/signup, redirect to home
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // If user is NOT authenticated and tries to access protected routes, redirect to login
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}
