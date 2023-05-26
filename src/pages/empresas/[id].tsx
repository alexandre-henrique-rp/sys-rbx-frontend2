import Loading from "@/component/elements/loading";
import { FormEmpresa } from "@/component/empresas";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EmpresaId() {
  const router = useRouter()
  const id = router.query.id;
  const [dados, setDados] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(()=>{
    (async()=>{
      setLoading(true)
      const response = await fetch(`/api/empresas/get/id/${id}`)
      const json = await response.json()
      setDados(json)
      setLoading(false)
    })()
  }, [id])
  
  if (loading) {
    return <Loading size="200px">Carregando...</Loading>;
  }

  return (
    <>
    <FormEmpresa data={dados}/>
    </>
  );
}
