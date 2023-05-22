import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export default function PdfPedido2(dados: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const infos = dados;

  const reportTitle = [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              border: [false, false, false, false],
              fillColor: "#1a562e",
              text: " ",
              margin: [0, 20, 0, 0]
            }
          ]
        ]
      }
    },
  ];
  const Titulo = [
    {
      style: "header",
      table: {
        widths: [310, "*"],
        body: [
          [
            {
              border: [false, false, false, false],
              image: infos.logo,
              fit: [80, 80], // Define o tamanho da imagem
              margin: [30, 3, 30, 3]
            },
            {
              border: [false, false, false, false],
              margin: [0, 5, 0, 5],
              table: {
                widths: [55, "*"],
                body: [
                  ["Data:", new Date().toLocaleDateString()],
                  ["Proposta N°:", infos.nPedido],
                  ["Vendedor:", infos.Vendedor],
                  ["Pedido N°:", infos.cliente_pedido]
                ]
              }
            }
          ]
        ]
      }
    }
  ]

  const Infcliente = [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              border: [false, true, false, false],
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    {
                      margin: [0, 10, 0, 0],
                      border: [false, false, false, false],
                      style: "clienteFornecedor",
                      table: {
                        widths: ["32%", "*"],
                        body: [
                          [
                            {
                              text: "Fornecedor",
                              // bold: "true",
                              fillColor: "#979797",
                              color: "#ffff",
                              fontSize: 10,
                              border: [false, false, false, false]
                            },
                            {
                              text: "",
                              fillColor: "#979797",
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Nome/Razão :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.fornecedor.data.razao,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Cnpj :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.fornecedor.data.cnpj,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Endereço :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.fornecedor.data.endereco,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Cidade :",
                              border: [false, false, false, false]
                            },
                            {
                              text:
                                infos.fornecedor.data.cidade +
                                ", " +
                                infos.fornecedor.data.uf,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Telefone :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.fornecedor.data.tel,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Email :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.fornecedor.data.email,
                              border: [false, false, false, false]
                            }
                          ]
                        ]
                      }
                    },
                    {
                      margin: [0, 10, 0, 0],
                      border: [false, false, false, false],
                      style: "clienteFornecedor",
                      table: {
                        widths: ["21%", "*"],
                        body: [
                          [
                            {
                              text: "Cliente",
                              // bold: "true",
                              fontSize: 9,
                              fillColor: "#979797",
                              color: "#ffff",
                              border: [false, false, false, false]
                            },
                            {
                              text: "",
                              fillColor: "#979797",
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Nome/Razão :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.cliente.nome,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Cnpj :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.cliente.CNPJ,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Endereço :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.cliente.endereco,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Cidade :",
                              border: [false, false, false, false]
                            },
                            {
                              text:
                                infos.cliente.cidade + ", " + infos.cliente.uf,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Telefone :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.cliente.fone,
                              border: [false, false, false, false]
                            }
                          ],
                          [
                            {
                              text: "Email :",
                              border: [false, false, false, false]
                            },
                            {
                              text: infos.cliente.email,
                              border: [false, false, false, false]
                            }
                          ]
                        ]
                      }
                    }
                  ]
                ]
              }
            }
          ]
        ]
      }
    }
  ];

  const InfosGeral = [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              border: [false, true, false, false],
              text: ""
            }
          ]
        ]
      }
    },
    {
      table: {
        widths: ["*", "30%"],
        body: [
          [
            {
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      text: "Avisos"
                    }
                  ],
                  [
                    {
                      margin: [0, 5, 0, 0],
                      border: [false, false, false, false],
                      text: "As embalagens são enviadas desmontadas.",
                      style: "clienteFornecedor"
                    }
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      text: "Para o envio das embalagens montadas, há um acréscimo de 10%.",
                      style: "clienteFornecedor"
                    }
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      text: "A montagem deve ser solicitada no momento da cotação.",
                      style: "clienteFornecedor"
                    }
                  ],
                  [
                    {
                      margin: [0, 8, 0, 0],
                      border: [false, false, false, false],
                      text: "OBS.",
                      style: 'clienteFornecedor'
                    }
                  ],
                  [
                    {
                      margin: [0, 5, 0, 0],
                      border: [false, false, false, false],
                      text: infos.obs,
                      style: "clienteFornecedor"
                    }
                  ]
                ]
              }
            },
            {
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      table: {
                        widths: ["40%", "*"],
                        body: [
                          [
                            {
                              border: [false, false, false, false],
                              text: "Condição de pagamento:",
                              // bold: "true",
                              fontSize: 8
                            },
                            {
                              margin: [0, 5, 0, 0],
                              border: [false, false, false, false],
                              text: infos.condi,
                              style: "clienteFornecedor"
                            }
                          ],
                          [
                            {
                              margin: [0, 5, 0, 0],
                              border: [false, false, false, false],
                              text: "Prazo:",
                              // bold: "true",
                              style: "clienteFornecedor"
                            },
                            {
                              margin: [0, 5, 0, 0],
                              border: [false, false, false, false],
                              text: infos.prazo,
                              style: "clienteFornecedor"
                            }
                          ],
                          [
                            {
                              margin: [0, 5, 0, 0],
                              border: [false, false, false, false],
                              text: "Tipo de frete:",
                              // bold: "true",
                              fontSize: 8
                            },
                            {
                              margin: [0, 5, 0, 0],
                              border: [false, false, false, false],
                              text: infos.frete,
                              style: "clienteFornecedor"
                            }
                          ],
                          [
                            {
                              margin: [20, 45, 0, 0],
                              border: [false, false, false, false],
                              text: "Total",
                              // bold: "true"
                            },
                            {
                              margin: [0, 45, 0, 0],
                              border: [false, false, false, false],
                              text: infos.totoalGeral
                            }
                          ]
                        ]
                      }
                    }
                  ]
                ]
              }
            }
          ]
        ]
      }
    }
  ];

  const Product = infos.itens;
  const products = Product.map((i: any, x: number) => [
    { text: x, margin: [0, 10, 0, 8] },
    { text: i.nomeProd, margin: [0, 10, 0, 8] },
    { text: i.codg, margin: [0, 10, 0, 8] },
    { text: i.Qtd, margin: [0, 10, 0, 8] },
    { text: !i.altura ? 0 : i.altura, margin: [0, 10, 0, 8] },
    { text: !i.largura ? 0 : i.largura, margin: [0, 10, 0, 8] },
    { text: !i.comprimento ? 0 : i.comprimento, margin: [0, 10, 0, 8] },
    { text: !!i.mont ? "SIM" : "NÃO", margin: [0, 10, 0, 8] },
    { text: !!i.expo ? "SIM" : "NÃO", margin: [0, 10, 0, 8] },
    { text: i.precoPrint, margin: [0, 10, 0, 8] },
    { text: i.totalPrint, margin: [0, 10, 0, 8] }
  ]);

  const tableProdut: any = [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              border: [false, false, false, true],
              text: ""
            }
          ]
        ]
      }
    },
    {
      style: "tableConteudo",
      margin: [0, 10, 0, 0],
      table: {
        widths: [
          "2%",
          "25%",
          "7%",
          "5%",
          "7%",
          "8%",
          "8%",
          "6%",
          "6%",
          "12%",
          "14%"
        ],
        headerRows: 1,
        heights: 4,
        body: [
          [
            { text: "x", style: "tableTitle" },
            { text: "Produto", style: "tableTitle" },
            { text: "Cód.", style: "tableTitle" },
            { text: "Qtd", style: "tableTitle" },
            { text: "Alt.", style: "tableTitle" },
            { text: "Larg.", style: "tableTitle" },
            { text: "Comp.", style: "tableTitle" },
            { text: "MONT.", style: "tableTitle" },
            { text: "EXP.", style: "tableTitle" },
            { text: "Valor Un.", style: "tableTitle" },
            { text: "Total", style: "tableTitle" }
          ],
          ...products
        ]
      },
      layout: "lightHorizontalLines"
    }
  ];

  const docDefinition: TDocumentDefinitions = {
    info:{
      title: "Relatório de Vendas "+ infos.cliente.nome,
      author: infos.Vendedor,
      subject: "Relatório de Vendas",
    },
    pageSize: "A4",
    pageMargins: [25, 60, 25, 10],
    header: [reportTitle],
    content: [Titulo, Infcliente, InfosGeral, tableProdut],
    styles: {
      header: {
        fontSize: 9,
        alignment: "justify"
      },
      clienteFornecedor: {
        fontSize: 8,
        alignment: "justify"
      },
      tableTitle: {
        fontSize: 8,
        alignment: "center"
      },
      tableConteudo: {
        fontSize: 9,
        alignment: "center"
      }
    },
    footer: function (currentPage, pageCount) {
      return {
        text: "Pagina " + currentPage.toString() + " de " + pageCount,
        alignment: "right",
        fontSize: 6,
        margin: [0, 10, 20, 10]
      };
    }
  };
  return docDefinition;
}
