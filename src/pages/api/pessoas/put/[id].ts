import { NextApiRequest, NextApiResponse } from "next";
import { dbPut } from "./request/db";
import { phpPut } from "./request/php";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const bodyData = req.body;
    const id: any = req.query.id;
    const Email = bodyData.data.apiauthorization;

    if (!bodyData) {
      return res
        .status(401)
        .send("Essa requisição não tem informação para serem gravadas");
    }
    if (!id || id === undefined || id == null || id == "") {
      console.log("passou 2");
      return res.status(401).send("id não foi informado");
    } else {
      
      const DataRbx = {
        nome: bodyData.nome,
        email: bodyData.email,
        xNome: bodyData.fantasia,
        CNPJ: bodyData.CNPJ,
        IE: bodyData.Ie,
        IM: "",
        fone: bodyData.cidade,
        indIEDest: "",
        CNAE: bodyData.CNAE,
        xLgr: bodyData.endereco,
        nro: bodyData.numero,
        xCpl: bodyData.complemento,
        cMun: "",
        cPais: bodyData.codpais,
        xPais: bodyData.pais,
        xBairro: bodyData.bairro,
        CEP: bodyData.cep,
        xMun: bodyData.cidade,
        UF: bodyData.uf,
        ativo: bodyData.status !== true ? "" : "1",
        tabela: bodyData.tablecalc,
        ultima_compra: "",
        LatAdFrSN: bodyData.adFrailLat === true ? "on" : "off",
        CabAdFrSN: bodyData.adFrailCab === true ? "on" : "off",
        LatAdExSN: bodyData.adEspecialLat === true ? "on" : "off",
        CabAdExSN: bodyData.adEspecialCab === true ? "on" : "off",
        LatForaSN: bodyData.latFCab === true ? "on" : "off",
        CabChaoSN: bodyData.cabChao === true ? "on" : "off",
        CabTopoSN: bodyData.cabTop === true ? "on" : "off",
        caixa_economica: bodyData.cxEco === true ? "on" : "off",
        caixa_estruturada: bodyData.cxEst === true ? "on" : "off",
        caixa_leve: bodyData.cxLev === true ? "on" : "off",
        caixa_reforcada: bodyData.cxRef === true ? "on" : "off",
        caixa_resistente: bodyData.cxResi === true ? "on" : "off",
        caixa_super_reforcada: bodyData.cxSupRef === true ? "on" : "off",
        engradado_economico: bodyData.engEco === true ? "on" : "off",
        engradado_leve: bodyData.engLev === true ? "on" : "off",
        engradado_reforcado: bodyData.engRef === true ? "on" : "off",
        engradado_resistente: bodyData.engResi === true ? "on" : "off",
        palete_sob_medida: bodyData.platSMed === true ? "on" : "off",
        formaPagto: bodyData.forpg,
        prefPagto: bodyData.maxPg,
        frete: bodyData.frete === "" ? "fob" : bodyData.frete
      };

      const db = await dbPut(bodyData, id);
      const php = await phpPut(DataRbx, Email);

      return res.status(201).send({ message1: db, message2: php });
    }
  } else {
    return res.status(405).send({ message: "Only PUT requests are allowed" });
  }
}
