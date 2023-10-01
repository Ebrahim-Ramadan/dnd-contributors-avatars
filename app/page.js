import Image from 'next/image'
import { DicebearGenerate } from '@/components/DicebearGenerate'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-8">
      <DicebearGenerate/>
    </main>
  )
}
