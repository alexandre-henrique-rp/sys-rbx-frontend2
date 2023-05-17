export const ErroTrello = async (ERROR: any) => {
  const token = process.env.ATORIZZATION_TOKEN;
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const STRAPI_API_URL = `${STRAPI_BASE_URL}/erro-trellos`;

  const DodyData = {
    data: {
      ...ERROR,
    },
  };

  try {
    const response = await fetch(STRAPI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DodyData),
    });

    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err: any) {
    console.log(err.response.data);
    return err.response.data;
  }
};
