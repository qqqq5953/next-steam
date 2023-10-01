type Props = {
  orderValue: string
  platformValue: string
  mode: string | string[] | undefined
  data: object[]
  time: bigint
}

export default async function Test1({
  orderValue,
  platformValue,
  mode,
  data,
  time
}: Props) {
  const end = process.hrtime.bigint()
  console.log('end', end)

  console.log('diff sec', parseInt((end - time).toString()) / 1e9)
  return (
    <>
      <div>orderValue: {orderValue}</div>
      <div>platformValue: {platformValue}</div>
      <div>mode: {mode}</div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
        {data.map((item) => {
          return (
            <div key={item.id} className="bg-blue-600">
              {item.title || item.body || item.name}
            </div>
          )
        })}
      </section>
    </>
  )
}
