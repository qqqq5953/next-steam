export async function getCreators() {
  const res = await fetch(
    `https://api.rawg.io/api/creators?key=${process.env.RAWG_API_KEY}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch creators: ${res.status}`);
  }
  
  const data = await res.json()
  return data
}