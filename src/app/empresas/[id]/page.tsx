import dynamic from "next/dynamic";

interface UpDateProps {
  params: {
    id: "string",
  }
}

export default async function UpDate({ params }: UpDateProps) {
  const FormEmpresa = dynamic(() => import('@/components/empresas/form').then((mod) => mod.FormEmpresa))
  const { id } = params;
  const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
    `/empresas/${id}?&populate=%2A`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
    },
    next: {
      revalidate: 30 // aki eu esto dizendo que esse requisiçao tem que validar as informaçoes acada 30mim
    }
  })
  const data = await response.json();
  const resposta = data.data

  return (
    <>
      <FormEmpresa Data={resposta} />
    </>
  )
}