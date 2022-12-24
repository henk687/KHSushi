import Layout from '../../components/Layout'
import { client, urlFor } from '../../lib/client'
import Image from 'next/image'
import css from '../../styles/Sushi.module.css'
import LeftArrow from '../../assets/arrowLeft.png'
import RightArrow from '../../assets/arrowRight.png'
import { useState } from 'react'
import { useStore } from '../../store/store'
import toast, { Toaster } from 'react-hot-toast'

export default function Sushi({sushi}) {
  const src = urlFor(sushi.image).url()
  const [Size, setSize] = useState(1)
  const [Quantity, setQuantity] = useState(1)

  // handle quantity

  const handelQuan = (type) => {
    type === 'inc' 
      ? setQuantity(prev => prev + 1)
      : Quantity === 1
      ? null
      : setQuantity(prev => prev - 1)
  }

  // add to cart function
  const addSushi = useStore((state) => state.addSushi)
  const addToCart = () => {
    addSushi({...sushi, price: sushi.price[Size], quantity: Quantity, size: Size})
    toast.success('Toegevoegd aan Winkelwagen')
  }

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image 
            loader = {() => src}
            src={src} 
            alt="" 
            layout='fill'
            unoptimized
            objectFit='cover'
          />
        </div>

        {/* right side */}
        <div className={css.right}>
          <span>{sushi.name}</span>
          <span>{sushi.details}</span>

          <span><span style={{color: "var(--themeRed)"}}>€</span> {sushi.price[Size]}</span>

          <div className={css.size}>
            <span>Maat</span>
            <div className={css.sizeVariants}>
              <div className={Size === 0 ? css.selected : ''} onClick={() => setSize(0)}>Klein</div>
              <div className={Size === 1 ? css.selected : ''} onClick={() => setSize(1)}>Middel</div>
              <div className={Size === 2 ? css.selected : ''} onClick={() => setSize(2)}>Groot</div>
            </div>
          </div>

          {/* Quantity counter */}
          <div className={css.quantity}>
            <span>Aantal</span>

            <div className={css.counter}>
              <Image 
                src={LeftArrow} 
                alt="" 
                width={20} 
                height={20}
                objectFit='contain'
                onClick={() => handelQuan("dec")}
              />

              <span>{Quantity}</span>

              <Image 
                src={RightArrow} 
                alt="" 
                width={20} 
                height={20}
                objectFit='contain'
                onClick={() => handelQuan("inc")}
              />
            </div>
          </div>

          {/* button */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>
            In winkelwagen
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="sushi" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const {slug = ""} = context.params
  const sushi = await client.fetch(
    `*[_type=="sushi" && slug.current == '${slug}'][0]`
  )
  return {
    props: {
      sushi,
    },
  }
}