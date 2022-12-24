import Image from 'next/image'
import css from '../styles/Cart.module.css'
import Layout from '../components/Layout'
import { useStore } from '../store/store'
import { urlFor } from '../lib/client'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import OrderModal from '../components/OrderModal'

export default function Cart() {
  const CartData = useStore((state) => state.cart)
  const removeSushi = useStore((state) => state.removeSushi)
  const [PaymentMethod, setPaymentMethod] = useState(null)

  const handleRemove = (i) => {
    removeSushi(i)
    toast.error('Item Verwijderd')
  }

  const total = () => CartData.sushis.reduce((a, b) => a + b.quantity * b.price, 0)

  const handleOnDelivery = () => {
    setPaymentMethod(0)
    typeof window !== 'undefined' && localStorage.setItem('total', total())
  }
  return (
    <Layout>
      <div className={css.container}>

        {/* details */}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Sushi</th>
              <th>Naam</th>
              <th>Maat</th>
              <th>Prijs</th>
              <th>Aantal</th>
              <th>Totaal</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {
                CartData.sushis.length > 0 &&
                CartData.sushis.map((sushi, i) => {
                  const src = urlFor(sushi.image).url()

                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image 
                          loader = {() => src}
                          src={src}
                          alt=""
                          objectFit='cover'
                          width={85}
                          height={85}
                        />
                      </td>
                      <td>{sushi.name}</td>
                      <td>
                        {
                          sushi.size === 0
                          ? "Small"
                          : sushi.size === 1 
                          ? "Medium"
                          : "Large"
                        }
                      </td>
                      <td>{sushi.price}</td>
                      <td>{sushi.quantity}</td>
                      <td>{sushi.price * sushi.quantity}</td>
                      <td 
                        style={{
                          color: "var(--themeRed)", 
                          cursor: "pointer"
                        }}
                        onClick={() => handleRemove(i)}
                      >
                        x
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        {/* summary */}
        <div className={css.cart}>
          <span>Winkelwagen</span>
          <div className={css.cartDetails}>
            <div>
              <span>Artikelen</span>
              <span>{CartData.sushis.length}</span>
            </div>

            <div>
              <span>Totaal</span>
              <span>€ {total()}</span>
            </div>
          </div>

          <div className={css.buttons}>
            <button className='btn' onClick={handleOnDelivery}>Betalen bij levering</button>
          </div>
        </div>
      </div>
      <Toaster />

      {/* Modal */}
      <OrderModal 
        opened = {PaymentMethod === 0}
        setOpened = {setPaymentMethod}
        PaymentMethod = {PaymentMethod}
      />
    </Layout>
  )
}