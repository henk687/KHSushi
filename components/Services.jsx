import Image from 'next/image'
import css from '../styles/Services.module.css'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'

export default function Services() {
  return (
    <>
      <div className={css.heading}>
        <span>WAT WIJ SERVEREN</span>
        <span>Je favoriete eten</span>
        <span>Bezorgings Partner</span>
        
        {/* features */}
        <div className={css.services}>
          <div className={css.feature}>

            <div className={css.ImageWrapper}>
              <Image src={s1} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
            
            <span>Makkelijk te bestellen</span>
            <span>Je hebt maar enkele stappen nodig om eten te bestellen</span>
          </div>

          <div className={css.feature}>
            
            <div className={css.ImageWrapper}>
              <Image src={s2} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
              
            <span>Makkelijk te bestellen</span>
            <span>Levering die altijd op tijd is</span>
          </div>
          
          <div className={css.feature}>

            <div className={css.ImageWrapper}>
              <Image src={s3} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
            
            <span>Makkelijk te bestellen</span>
            <span>Niet alleen snel bij ons, ook kwaliteit staat op nummer één</span>
          </div>
        </div>
      </div>
    </>
    
  )
}