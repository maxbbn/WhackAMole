// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import WhackAMole from './WhackAMole'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <WhackAMole />
    </main>
  )
}
