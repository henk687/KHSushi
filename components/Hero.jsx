import Image from 'next/image'
import css from '../styles/Hero.module.css'
import Sushi from '../assets/sushi1.png'
import HeroImage from '../assets/HeroImage.png'
import Sushi4 from '../assets/sushi-box-4.jpg'
import Link from 'next/link'

export default function Hero() {
  return (
    <div>
      <div className={css.container}>
        {/* left side */}
        <div className={css.left}>
          <div className={css.sushiDiv}>
            <span>Snelle bezorging</span>
            <Image src={Sushi} alt="" width={40} height={25}/>
          </div>
        
          <div className={css.heroText}>
            <span>Wij bezorgen</span>
            <span>De lekkerste</span>
            <span>

              Verse <span style={{color: "var(--themeRed)"}}>Sushi</span>
            </span>
          </div>

          <span className={css.miniText}>
            Wij bezorgen Sushi in de omgeving Almelo vanaf 1 Mei 2023
          </span>
        </div>
        {/* rigth side */}
        <div className={css.right}>
          <div className={css.imageContainer}>
            <Image src={HeroImage} alt="" layout='intrinsic'/>
          </div>

          <Link href={`./sushi/sushi-box-1`}>
            <div className={css.detailsTop}>
              <span>Sushi box 1</span>
              <span>
                <span style={{color: "var(--themeRed)"}}>€</span> 20
              </span>
            </div>
          </Link>

          <div className={css.Sushi}>
            <div>
              <Image src={Sushi4} alt="" objectFit='cover'/>
            </div>

            <Link href={`./sushi/sushi-box-4`}>
              <div className={css.details}>
                <span>Sushi box 4</span>
                <span>
                  <span style={{color: "var(--themeRed)"}}>€</span> 21
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}