'use client'

import { memo, useMemo } from "react";
import PropostaFormulario from "@/components/proposta/form"



async function GetProposta(nPedido: any) {
  const request = await fetch(`/propostas/api/negocio/${nPedido}`)
  const json = await request.json()
  return json
}
async function PropostasEditId({
  params: { nPedido },
}: {
  params: { nPedido: string };
}) {

  const data = nPedido !== undefined? await GetProposta(nPedido) : []

  return (
    <>
      <PropostaFormulario data={data} />
    </>
  )
}

export default PropostasEditId