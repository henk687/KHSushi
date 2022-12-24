import css from '../styles/OrderModal.module.css'
import { Modal, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { createOrder } from '../lib/orderHandler'
import  toast, {Toaster} from 'react-hot-toast'
import { useStore } from '../store/store'
import { useRouter } from 'next/router'

export default function OrderModal({opened, setOpened, PaymentMethod}) {
  const theme = useMantineTheme()
  const router = useRouter()
  const [FormData, setFormData] = useState({})

  const handleInput = (e) => {
    setFormData({...FormData, [e.target.name]: e.target.value})
  }

  const resetCart = useStore((state) => state.resetCart)

  const total = typeof window !== 'undefined' && localStorage.getItem('total')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = await createOrder({...FormData, total, PaymentMethod})
    toast.success("Bestelling geplaatst")
    resetCart()
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id)
    }

    router.push(`/order/${id}`)
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened = {opened}
      onClose = {() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input onChange={handleInput} type="text" name='name' required placeholder='Naam'/>
        <input onChange={handleInput} type="text" name='phone' required placeholder='Telefoon'/>
        <textarea onChange={handleInput} name="address" rows="3" placeholder='Adres'></textarea>
        <span>
          Je betaalt <span>€ {total}</span> bij aflevering
        </span>
        <button type='submit' className='btn'>Plaats Bestelling</button>
      </form>

      <Toaster />
    </Modal>
  )
}