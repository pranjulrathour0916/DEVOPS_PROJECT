import { createSlice } from "@reduxjs/toolkit";

const cartItem = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartItem,
  reducers: {
    addItem: (state, action) => {
      const prod = action.payload;
      const searchItem = state.find((item) => item.id === prod.id);
      if (searchItem) {
        searchItem.quantity += 1;
      } else {
        state.push({
          ...prod,
          quantity: 1,
        });
      }
    },

    removeItem : (state, action) => {
        const prod = action.payload
        const searchItem = state.find((item) => item.id === prod.id)
        if(searchItem.quantity === 1)
        {
         const index =   state.findIndex((item)=> item.id === prod.id)
            state.splice(index,1)
        }
        if(searchItem.quantity > 1)
            searchItem.quantity -= 1;
    }


   
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
