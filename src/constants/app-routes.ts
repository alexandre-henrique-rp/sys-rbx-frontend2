export const APP_ROUTES ={
  private: {
    empresas: {
      name:  "/empresas/*",
    },
    negocios: {
      name: "/negocios/*",
    },
    pessoas: {
      name: "/pessoas/*",
    },
    produtos: {
      name: "/produtos/*",
    },
    propostas: {
      name: "/propostas/*",
    },
    tarefas: {
      name:  "/tarefas/*",
    },
    root: {
      name:  "/",
    },
  },
  public:{
    login: '/auth/signin',
    forget_password: '/auth/signin/revalidated'
  }
}