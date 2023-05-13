'use client'
import { BodyPessoa } from "@/components/passoas";
import { Heading } from "@chakra-ui/react";

const GetPessoas = async () => {
  const pessoas = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + `/pessoas?filters[status][$eq]=true&populate=%2A`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
    },
    cache: 'no-store'
    // a padrão é a cache:'force-cache' essa função faz qcom que a requisição seja unica pelo servidor deixando a pagina estatica
    //   // para deixar dinamica vamos usar o cache: 'no-store' 
  })
  const resposta = await pessoas.json()
  return resposta.data
}

export default async function Pessoas() {
  const DataPessoas = await GetPessoas()
  console.log("🚀 ~ file: page.tsx:21 ~ Pessoas ~ DataPessoas:", DataPessoas)

  return (
    <>
      <BodyPessoa data={DataPessoas} />
    </>
  )
}