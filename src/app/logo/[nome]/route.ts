import { NextResponse } from "next/server";

import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { nome: string };
  }
) {
  const nome = params.nome; 
  
  const imagePath2 = path.join(
    process.cwd(),
    "public",
    "img",
    "logomarca-efect.jpg"
  );
  const imageContent2 = fs.readFileSync(imagePath2).toString("base64");
  const dataUrl2 = `data:image/jpeg;base64,${imageContent2}`;

  const imagePath = path.join(
    process.cwd(),
    "public",
    "img",
    "Bragheto - Logomarca com nome (Fundo transparente).png"
  );
  const imageContent = fs.readFileSync(imagePath).toString("base64");
  const dataUrl = `data:image/jpeg;base64,${imageContent}`;

  const logo =
  nome === "BRAGHETO PALETES E EMBALAGENS LTDA"
      ? dataUrl
      : dataUrl2;
  
      return NextResponse.json({logo})
}
