'use client'
import { useRouter } from "next/navigation";


interface UpDateProps {
  params: {
    id: "string",
  }
}

export default function PropostasEditId({ params }: UpDateProps) {
  const { push } = useRouter()
  const ID = params.id

  return (
    <>
      
    </>
  )
}