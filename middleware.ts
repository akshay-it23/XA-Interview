import { withAuth } from "next-auth/middleware";

/* 
export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});
*/

export default function middleware() {
  return; // Bypass auth
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
  ],
};
