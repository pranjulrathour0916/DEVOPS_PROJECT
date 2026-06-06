import { configureStore } from '@reduxjs/toolkit'

import navReducer from './showslice'
import productSlice from './imageslice'
import cartreducer from './cartSlice'

export const store = configureStore({
  reducer: {
    navdisp : navReducer,
    slideDisp : productSlice,
    cart :  cartreducer
    
  },
})