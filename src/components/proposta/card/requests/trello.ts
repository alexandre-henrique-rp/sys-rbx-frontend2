import { ErroTrello } from "./lid/errTrello";
import { GetLoteProposta } from "./lid/getLote"
import { GetPedido } from "./lid/getPedido";

export const Trello = async (numero: any) => {
  const [pedido] = await GetPedido(numero);
  const lote = await GetLoteProposta(numero);

  const items = pedido.attributes.itens;
  const cliente = pedido.attributes.empresa.data.attributes.nome;
  const negocio = pedido.attributes.business.data.attributes.nBusiness;
  const frete =
    pedido.attributes.frete === "" ? "Fob" : pedido.attributes.frete;
  const pgto = pedido.attributes.condi;
  const Bpedido = pedido.attributes.Bpedido;
  const estrega = pedido.attributes.business.data.attributes.deadline;
  const VendedorName = pedido.attributes.user.data.attributes.username;
  const fornecedorName = pedido.attributes.fornecedorId.data.attributes.nome;
  const userKey = pedido.attributes.user.data.attributes.trello_key;
  const userToken = pedido.attributes.user.data.attributes.trello_token;
  const pedidoCliente = pedido.attributes.cliente_pedido;

  const list = "6438073ecc85f294325f74ac"; //teste
  const Bord = "5fac445b3c5274707a309d61";

  //Membros
  const trelloMembers: string[] = [
    "5fd10678fbc6b504679737d4" /*Daniela*/,
    "62a736038685171186013ba4" /*Expedição*/,
    "5ff74138721978652e0293bb" /*Jesuila*/,
    "63e13cb526cca27c0d30f648" /*Edna*/,
    "63e13887ef5b25eea224493e" /*Luciana*/,
    "5d7bbf629972e80b374829bb" /*Fábrica*/,
  ];

  try {
    const promises = items.map(async (i: any) => {
      const Prenlote = lote
        .filter(
          (f: any) =>
            f.attributes.produtosId == i.prodId && f.attributes.qtde == i.Qtd
        )
        .map((p: any) => p.attributes.lote);
      const nlote = Prenlote[0];

      const type =
        i.mont === true && i.expo === false
          ? "MONT"
          : i.mont === false && i.expo === true
          ? "EXP"
          : "EXP - MONT";

      const nomeCard = `${cliente} - ${i.Qtd} - ${i.titulo} - Medidas ${i.comprimento} x ${i.largura} x ${i.altura} - peso ${i.pesoCx}(kg) - ${type} - Lote Nº ${nlote}`;

      const dataBoard = JSON.stringify({
        key: userKey,
        token: userToken,
        idList: list,
        boardId: Bord,
        name: nomeCard,
        desc: `Negocio: Nº. ${negocio},
          Proposta: Nº. ${numero},
          Vendedor(a): ${VendedorName},
          Empresa: ${fornecedorName},
          Tipo de frete: ${frete},
          Bling: Nº. ${Bpedido},
          Pedido: Nº. ${pedidoCliente},
          Lote: Nº. ${nlote},
          Forma de pagamento: ${pgto},
          Modelo: ${i.titulo}`,
        idMembers: trelloMembers,
        due: estrega,
        dueReminder: 2880,
        pos: "top",
      });

      let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "preAuthProps=s%3A5d7b946bb2d92e57d8d07e4d%3AisEnterpriseAdmin%3Dfalse.xktum%2BounyUl8SGrzLx%2BKGezb8C94Hysn%2FNSdI77YcY",
        },
        body: JSON.stringify(dataBoard),
      };

      try {
        const response = await fetch("https://api.trello.com/1/cards", config);
        const data = await response.json();
        return data.data;
      } catch (err: any) {

        const data = {
          log: {
            key: userKey,
            token: userToken,
            idList: list,
            boardId: Bord,
            name: nomeCard,
            negocio: negocio,
            Proposta: numero,
            Vendedor: VendedorName,
            Empresa: fornecedorName,
            Tipo_de_frete: frete,
            Bling: Bpedido,
            Lote: nlote,
            Forma_de_pagamento: pgto,
            Modelo: i.titulo,
            erro_status: err.status,
            erro_message: err.message,
          },
        };

        return await ErroTrello(data);
      }
    });

    const result = await Promise.all(promises);
    return result;
  } catch (error: any) {
    return error;
  }
};
