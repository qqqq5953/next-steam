type Props = {
  params: { name: string }
}


export default function Collection({ params: { name } }: Props) {
  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl capitalize'>{name}</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        Still working on it ...
        {/* {stores.results.map((store: AllStore) => {
          return <ItemCard key={store.id} data={store} />
        })} */}
      </section>
    </div>
  )
}
