type Props = {
  orderValue: string
  platformValue: string
  mode: string | string[] | undefined
}

export default async function Test({ orderValue, platformValue, mode }: Props) {
  console.log('===without props===')

  const start = process.hrtime.bigint()

  const obj = {
    '-relevance': 'posts',
    '-created': 'comments',
    name: 'albums',
    '-released': 'photos',
    '-added': 'todos',
    '-rating': 'users'
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/${obj[orderValue]}`
  )
  const data = await res.json()

  const end = process.hrtime.bigint()

  console.log('diff sec', parseInt((end - start).toString()) / 1e9)

  return (
    <>
      <div>orderValue: {orderValue}</div>
      <div>platformValue: {platformValue}</div>
      <div>mode: {mode}</div>
      <div>type: {obj[orderValue]}</div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
        {data.map((item) => {
          return (
            <div key={item.id} className="bg-blue-600">
              {item.title || item.body || item.name}
            </div>
          )
        })}
      </section>

      {/* {data && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
          {data.map((item) => {
            return (
              <div key={item.id} className="bg-blue-600">
                {item.title || item.body || item.name}
              </div>
            )
          })}
        </section>
      )} */}
    </>
  )
}
