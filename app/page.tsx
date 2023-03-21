import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Translate from './translate'
import Config from './config'
// import FiletoAtom from './languages'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <FiletoAtom /> */}
      <Config/>
      <Translate/>
    </main>
  )
}
