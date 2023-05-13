export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/empresas/*",
    "/negocios/*",
    "/pessoas/*",
    "/produtos/*",
    "/propostas/*",
    "/tarefas/*",
    "/home",
    "/"
  ]
};
