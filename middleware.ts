import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // NOTE: allows to hit all routes except orders page
  publicRoutes: (req) => !req.url.includes("/orders"),
  // NOTE: match for dynamic routes with regex
  ignoredRoutes: ["/orders/(.*)"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
