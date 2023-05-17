export const PostErroPHP =async (data:any) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/erro-phps`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    }
  )
  .then((res) => res.json())
  .then((response) => {
    console.log(response)
    return response
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}