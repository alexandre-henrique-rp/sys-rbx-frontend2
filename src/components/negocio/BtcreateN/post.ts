export const NumeroPedido = async () => {
  
  const numero = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API_URL +
      "/businesses?fields[0]=id&fields[1]=nBusiness&sort=id%3Adesc",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ATORIZZATION_TOKEN}`
      }
    }
  );

  const consulta = await numero.json();
  const [respostaConsulta] = !consulta.data ? null : consulta.data;
  const resposta =
    respostaConsulta === null
      ? "001"
      : respostaConsulta === undefined
      ? "001"
      : respostaConsulta.attributes.nBusiness;
  const dateNow = new Date();
  const anoVigente = dateNow.getFullYear();
  const resto = resposta.toString().replace(anoVigente, "");
  const restoInt = parseInt(resto) + 1;
  const newResto =
    restoInt < 10
      ? "000" + restoInt
      : restoInt > 99
      ? "00" + restoInt
      : restoInt > 999
      ? "0" + restoInt
      : restoInt;
  const newNuber = anoVigente.toString() + newResto;
  const newBusinesses = Number(newNuber);

  const nBusiness = !respostaConsulta
    ? Number(anoVigente + "000" + 1)
    : newBusinesses;

  return nBusiness.toString();
};
