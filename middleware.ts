export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/empresas/:path*",
    "/negocios/:path*",
    "/pessoas/:path*",
    "/produtos/:path*",
    "/propostas/:path*",
    "/tarefas/:path*"
  ]
};
