export async function getDevelopers() {
  const res = await fetch(
    `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch developers: ${res.status}`);
  }
  
  const data = await res.json()
  return data
}