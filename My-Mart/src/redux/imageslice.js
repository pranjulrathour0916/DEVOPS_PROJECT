import { createSlice } from "@reduxjs/toolkit";
import clothes from "../assets/clothes.png";
import shoes from "../assets/shoes.png";
import laptop from "../assets/laptop.png";
import headphone from "../assets/headphone.png";
import watch from "../assets/watch.png";
import mug from "../assets/mug.png";
// import mockData from '../mock-data.json'
const products = [
  { id: 1, title: "Shoes", price: "6999", rating: "4", img: shoes, width: 90 },
  {
    id: 2,
    title: "Clothes",
    price: "699",
    rating: "4",
    img: clothes,
    description: "Soft organic cotton t-shirt. Regular fit. Machine washable.",
    width: 200,
  },
  { id: 3, title: "Shoes", price: "699", rating: "4", img: shoes, width: 200 },
  {
    id: 4,
    title: "Laptop",
    price: "699",
    rating: "3",
    img: laptop,
    width: 200,
  },
  {
    id: 5,
    title: "headphone",
    price: "699",
    rating: "2",
    img: headphone,
    width: 200,
  },
  { id: 6, title: "watch", price: "699", rating: "5", img: watch, width: 200 },
  { id: 7, title: "mug", price: "699", rating: "4", img: mug, width: 200 },
  { id: 8, title: "Shoes", price: "699", rating: "4", img: shoes, width: 200 },
  {
    id: 9,
    title: "headphone",
    price: "699",
    rating: "4",
    img: headphone,
    width: 200,
  },
  // {id: 9, title : "Shoes", price : "699", img : shoes, width:200},
  // {id: 10, title : "Shoes", price : "699", img : shoes, width:200}
];
//  const products2 = mockData.products
export const producSlice = createSlice({
  name: "prods",
  initialState: products,
  reducers: {
    pullProd: (state) => {
      return state;
    },
  },
});

export const { pullProd } = producSlice.actions;
export default producSlice.reducer;
