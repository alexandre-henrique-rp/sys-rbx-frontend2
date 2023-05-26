import { NextApiRequest, NextApiResponse } from 'next';
import { dbPost } from './request/db';
import { phpPost } from './request/php';



export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const bodyData = JSON.parse(req.body);
    const Email = bodyData.apiauthorization
    

    const DataRbx = {
      nome: bodyData.nome,
      email: bodyData.email,
      xNome: bodyData.fantasia,
      CNPJ: bodyData.CNPJ,
      IE: bodyData.Ie,
      IM: '',
      fone: bodyData.cidade,
      indIEDest: '',
      CNAE: bodyData.CNAE,
      xLgr: bodyData.endereco,
      nro: bodyData.numero,
      xCpl: bodyData.complemento,
      cMun: '',
      cPais: bodyData.codpais,
      xPais: bodyData.pais,
      xBairro: bodyData.bairro,
      CEP: bodyData.cep,
      xMun: bodyData.cidade,
      UF: bodyData.uf,
      ativo: bodyData.status !== true ? '' : '1',
      tabela: bodyData.tablecalc,
      ultima_compra: '',
      LatAdFrSN: bodyData.adFrailLat === true ? 'on' : 'off',
      CabAdFrSN: bodyData.adFrailCab === true ? 'on' : 'off',
      LatAdExSN: bodyData.adEspecialLat === true ? 'on' : 'off',
      CabAdExSN: bodyData.adEspecialCab === true ? 'on' : 'off',
      LatForaSN: bodyData.latFCab === true ? 'on' : 'off',
      CabChaoSN: bodyData.cabChao === true ? 'on' : 'off',
      CabTopoSN: bodyData.cabTop === true ? 'on' : 'off',
      caixa_economica: bodyData.cxEco === true ? 'on' : 'off',
      caixa_estruturada: bodyData.cxEst === true ? 'on' : 'off',
      caixa_leve: bodyData.cxLev === true ? 'on' : 'off',
      caixa_reforcada: bodyData.cxRef === true ? 'on' : 'off',
      caixa_resistente: bodyData.cxResi === true ? 'on' : 'off',
      caixa_super_reforcada: bodyData.cxSupRef === true ? 'on' : 'off',
      engradado_economico: bodyData.engEco === true ? 'on' : 'off',
      engradado_leve: bodyData.engLev === true ? 'on' : 'off',
      engradado_reforcado: bodyData.engRef === true ? 'on' : 'off',
      engradado_resistente: bodyData.engResi === true ? 'on' : 'off',
      palete_sob_medida: bodyData.platSMed === true ? 'on' : 'off',
      formaPagto: bodyData.forpg,
      prefPagto: bodyData.maxPg,
      frete: bodyData.frete === '' ? 'fob' : bodyData.frete,
    };

      const db = await dbPost(bodyData)
      const php = await phpPost(DataRbx, Email)

      return res.status(201).send({ message1: db, message2: php});
  } else {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }
}
