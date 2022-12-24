import Image from 'next/image'
import css from '../styles/Footer.module.css'
import Logo from '../assets/Logo.png'

export default function Footer() {
  return (
    <div>
      <div className={css.container}>
        <span>&copy; {new Date().getFullYear()}. Alle rechten voorbehouden</span>

        <div className={css.logo}>
          <Image src={Logo} alt="" width={50} height={50}/>
          <span>KHSushi</span>
        </div>
      </div>
    </div>
  )
}