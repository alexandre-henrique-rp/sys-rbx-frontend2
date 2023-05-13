import { FormPessoa } from "@/components/passoas/form";

interface UpDateProps {
  params: {
    id: "string",
  }
}

export default async function UpdatePessoa({ params }: UpDateProps) {
  const { id } = params;
  const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
    `/pessoas/${id}?&populate=*`, {
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
      <FormPessoa data={resposta} />
    </>
  )
}