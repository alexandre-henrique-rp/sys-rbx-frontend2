import { NextResponse } from "next/server";

export async function GET() {
  const url =  process.env.NEXT_PUBLIC_STRAPI_API_URL + "/businesses?fields[0]=id&fields[1]=nBusiness&sort=id%3Adesc"
  const Tokem = process.env.NEXT_PUBLIC_STRAPI_API_KEY
  console.log(url)
  console.log(Tokem)
  const respose = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API_URL +
      "/businesses?fields[0]=id&fields[1]=nBusiness&sort=id%3Adesc",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    }
  )
  try {
    const
    const [respostaConsulta] = !consulta.data ? null : consulta.data;
  // const resposta =
  //   respostaConsulta === null
  //     ? "001"
  //     : respostaConsulta === undefined
  //     ? "001"
  //     : respostaConsulta.attributes.nBusiness;
  // const dateNow = new Date();
  // const anoVigente = dateNow.getFullYear();
  // const resto = resposta.toString().replace(anoVigente, "");
  // const restoInt = parseInt(resto) + 1;
  // const newResto =
  //   restoInt < 10
  //     ? "000" + restoInt
  //     : restoInt > 99
  //     ? "00" + restoInt
  //     : restoInt > 999
  //     ? "0" + restoInt
  //     : restoInt;
  // const newNuber = anoVigente.toString() + newResto;
  // const newBusinesses = Number(newNuber);

  // const nBusiness = !respostaConsulta
  //   ? Number(anoVigente + "000" + 1)
  //   : newBusinesses;

  } catch (error) {
    
  }
  .then(res => res.json())
  .then(respose =>{
    console.log(respose);
    return NextResponse.json(respose.data);
    
  })
  .catch( err => console.log)

  


  
}

// const dataAtualizado = {
//   data: {
//     status: true,
//     statusAnd: "Ativo",
//     deadline: data.deadline,
//     nBusiness: nBusiness.toString(),
//     Budget: data.Budget,
//     Approach: data.Approach,
//     history: [data.history],
//     incidentRecord: data.incidentRecord,
//     empresa: Number(data.empresa),
//     user: data.user,
//     andamento: 1,
//     etapa: 3,
//   },
// };
