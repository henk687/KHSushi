import Image from 'next/image'
import { urlFor } from '../lib/client'
import css from '../styles/Menu.module.css'
import Link from 'next/link'

export default function Menu({sushis}) {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>ONS MENU</span>
        <span>Menu dat je altijd</span>
        <span>Blij laat worden</span>
      </div>

      <div className={css.menu}>
        {/* sushis */}
        {
          sushis.map((sushi, id) => {
            const src = urlFor(sushi.image).url()
            return (
              <div className={css.sushi} key={id}>

                <Link href={`./sushi/${sushi.slug.current}`}>
                  <div className={css.ImageWrapper}>
                    <Image 
                      loader = {() => src}
                      src={src} 
                      alt="" 
                      objectFit='cover'
                      layout='fill'
                    />
                  </div>
                </Link>
                
                <span>{sushi.name}</span>
                <span><span style={{color: 'var(--themeRed)'}}>€</span> {sushi.price[1]}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}