export async function getTags() {
  const res = await fetch(
    `https://api.rawg.io/api/tags?key=${process.env.RAWG_API_KEY}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status}`);
  }
  
  const data = await res.json()
  return data
}