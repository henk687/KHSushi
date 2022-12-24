import css from '../../styles/Order.module.css'
import {client} from '../../lib/client'
import Layout from '../../components/Layout'
import {UilBill, UilBox} from '@iconscout/react-unicons'
import Cooking from '../../assets/cooking.png'
import Onway from '../../assets/onway.png'
import Spinner from '../../assets/spinner.svg'
import Image from 'next/image'
import { useEffect } from 'react'

export const getServerSideProps = async({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`
  const order = await client.fetch(query)

  return {
    props: {
      order: order[0]
    }
  }
}

export default function Orders({order}) {
  useEffect(() => {
    if(order.status > 3) {
      localStorage.clear()
    }
  }, [order])

  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>
          Bestelling bezig
        </span>
        <div className={css.details}>
          <div>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>
          <div>
            <span>klantnaam</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Telefoon</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Methode</span>
            <span>
              {
                order.method === 0 ? 'Onder rembours' : ''
              }
            </span>
          </div>
          <div>
            <span>Totaal</span>
            <span>€ {order.total}</span>
          </div>
        </div>
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilBill width={50} height={50}/>
            <span>Betaling</span>
            {
              order.method === 0 ? (
                <span className={css.pending}>Bij levering</span>
              ) : (
                <span className={css.completed}>Op Voltooid</span>
              )
            }
          </div>

          <div className={css.status}>
            <Image src={Cooking} alt="" width={50} height={50}/>
            <span>Koken</span>

            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}

            {order.status> 1 && (
              <span className={css.completed}>
                Compleet
              </span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Onway} alt="" width={50} height={50}/>
            <span>Onderweg</span>

            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}

            {order.status> 2 && (
              <span className={css.completed}>
                Compleet
              </span>
            )}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50}/>
            <span>Geleverd</span>

            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt=""/>
              </div>
            )}

            {order.status> 3 && (
              <span className={css.completed}>
                Compleet
              </span>
            )}
          </div>
        </div>
      </div>
    </Layout>
      
  )
}