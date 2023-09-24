export default async function useFetch(url: string, option?: object) {
  let data
  let error

  try {
    const res = await fetch(url)

    if (!res.ok) throw new Error(`Failed to fetch data`)

    data = await res.json()
  } catch (err) {
    console.log(err)
    error = err
  }

  return { data, error }
}
