import Navbar from '@/components/Navbar'
import Select from '@/components/Select'

export default function Home() {
  const options = [
    {
      name: '123',
      value: '123'
    },
    {
      name: '456',
      value: '456'
    }
  ]

  return (
    <main>
      <Navbar></Navbar>
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold">New and trending</h2>
        <h3 className="text-sm font-light pt-2">
          Based on player counts and release date
        </h3>
      </div>
      <div className="flex gap-3">
        <Select selectedValuePrefix={'Order by:'} options={options} />
        <Select options={options} />
      </div>
    </main>
  )
}
