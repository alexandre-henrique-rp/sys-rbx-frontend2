
export const PostEmpresa = async (data: any) => {

  const EMAIL: any = process.env.ATORIZZATION_EMAIL
  const TOKEN: any = process.env.ATORIZZATION_TOKEN_RIBERMAX
  const bodyData = data.data;

  const myHeaders = new Headers();
  myHeaders.append("Email", EMAIL );
  myHeaders.append("Token", TOKEN);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("nome", bodyData.nome);
  urlencoded.append("email", bodyData.email);
  urlencoded.append("xNome", bodyData.fantasia);
  urlencoded.append("CNPJ", bodyData.CNPJ);
  urlencoded.append("IE", bodyData.Ie);
  urlencoded.append("fone", bodyData.celular);
  urlencoded.append("CNAE", bodyData.CNAE);
  urlencoded.append("xLgr", bodyData.endereco);
  urlencoded.append("nro", bodyData.numero);
  urlencoded.append("xCpl", bodyData.complemento);
  urlencoded.append("cPais", bodyData.codpais);
  urlencoded.append("xPais", bodyData.pais);
  urlencoded.append("xBairro", bodyData.bairro);
  urlencoded.append("CEP", bodyData.cep);
  urlencoded.append("xMun", bodyData.cidade);
  urlencoded.append("UF", bodyData.uf);
  urlencoded.append("ativo", bodyData.status !== true ? '' : '1',);
  urlencoded.append("tabela", bodyData.tablecalc);
  urlencoded.append("LatAdFrSN", bodyData.adFrailLat === true ? 'on' : 'off');
  urlencoded.append("CabAdFrSN", bodyData.adFrailCab === true ? 'on' : 'off');
  urlencoded.append("LatAdExSN", bodyData.adEspecialLat === true ? 'on' : 'off');
  urlencoded.append("CabAdExSN", bodyData.adEspecialCab === true ? 'on' : 'off');
  urlencoded.append("LatForaSN", bodyData.latFCab === true ? 'on' : 'off');
  urlencoded.append("CabChaoSN", bodyData.cabChao === true ? 'on' : 'off');
  urlencoded.append("CabTopoSN", bodyData.cabTop === true ? 'on' : 'off');
  urlencoded.append("caixa_economica", bodyData.cxEco === true ? 'on' : 'off');
  urlencoded.append("caixa_estruturada", bodyData.cxEst === true ? 'on' : 'off');
  urlencoded.append("caixa_leve", bodyData.cxLev === true ? 'on' : 'off');
  urlencoded.append("caixa_reforcada", bodyData.cxRef === true ? 'on' : 'off');
  urlencoded.append("caixa_resistente", bodyData.cxResi === true ? 'on' : 'off');
  urlencoded.append("caixa_super_reforcada", bodyData.cxSupRef === true ? 'on' : 'off');
  urlencoded.append("engradado_economico", bodyData.engEco === true ? 'on' : 'off');
  urlencoded.append("engradado_leve", bodyData.engLev === true ? 'on' : 'off');
  urlencoded.append("engradado_reforcado", bodyData.engRef === true ? 'on' : 'off');
  urlencoded.append("engradado_resistente", bodyData.engResi === true ? 'on' : 'off');
  urlencoded.append("palete_sob_medida", bodyData.platSMed === true ? 'on' : 'off');
  urlencoded.append("formaPagto", bodyData.forpg);
  urlencoded.append("prefPagto", bodyData.maxPg);
  urlencoded.append("frete", bodyData.frete === '' ? 'fob' : bodyData.frete);

  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + '/empresas', requestOptions)
    .then(response => response.text())
    .then(result => {return result})
    .catch(error => console.log('error', error));
}