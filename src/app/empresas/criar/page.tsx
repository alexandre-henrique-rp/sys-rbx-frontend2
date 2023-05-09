import dynamic from "next/dynamic";

export default async function Create() {
  const FormEmpresa = dynamic(() => import('@/components/empresas/form').then((mod) => mod.FormEmpresa))
  return (
    <>
      <FormEmpresa />
    </>
  )
}