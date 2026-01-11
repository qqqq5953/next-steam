export async function getStores() {
  const res = await fetch(
    `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch stores: ${res.status}`);
  }
  
  const data = await res.json()
  return data
}