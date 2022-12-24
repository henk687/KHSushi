import create from 'zustand'

export const useStore = create((set) => ({
    // cart
    cart: {
      sushis: []
    },

    // add Sushi in cart
    addSushi: (data) => 
    set((state) => ({
      cart: {
        sushis: [...state.cart.sushis, data]
      }
    })),

    // Remove sushi
    removeSushi: (index) =>
    set((state) => ({
      cart: {
        sushis: state.cart.sushis.filter((_, i) => i !=index)
      }
    })),

    resetCart: () => 
    set(() => ({
      cart: {
        sushis: []
      }
    }))
  })
)