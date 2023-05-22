'use client'
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";


interface UpDateProps {
  params: {
    id: "string",
  }
}

export default async function PropostasAddId({ params }: UpDateProps) {
  const [data, setData] = useState<any>([])
  const { push } = useRouter()
  const ID = params.id
  const GetNegocio = useMemo(async ()=> {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +`/businesses/${ID}?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    });
    const dados = await response.json();
    return dados.data
  }, [ID])


  return (
    <>
      
    </>
  )
}