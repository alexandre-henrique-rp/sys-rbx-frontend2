export const DeleteEmpresa = async (CNPJ: any) => {
  const EMAIL: any = process.env.ATORIZZATION_EMAIL;
  const TOKEN: any = process.env.ATORIZZATION_TOKEN_RIBERMAX;

  const myHeaders = new Headers();

  myHeaders.append("Email", EMAIL);
  myHeaders.append("Token", TOKEN);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("CNPJ", CNPJ);

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + "/empresas", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};
