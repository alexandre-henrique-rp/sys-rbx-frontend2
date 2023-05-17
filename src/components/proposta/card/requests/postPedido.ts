import { GetPedido } from "./lid/getPedido";
import { PostPedido } from "./lid/postPedito";

export const PedidoClientePost =async (nPedido: any) => {
  try {
    const infos = await GetPedido(nPedido);
    const [data]: any = infos;
    const getPedido = await PostPedido(data);
    console.log("🚀 ~ file: [nPedido].ts:18 ~ getPedido:", getPedido)

    return getPedido;
  } catch (error: any) {
    return error;
  }
}