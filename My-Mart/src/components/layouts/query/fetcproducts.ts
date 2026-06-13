import axios from "axios";
const URL = "/api/prod"
export interface cartItem {
  prodId: Number;
  quantity: Number;
}

export const fectProducts = async (category?: number) => {
  console.log("query", category);
  const productsList = await axios.get(
    `${URL}/getallProd/`,
    {
      params: category ? { category } : {},
    },
  );
  return productsList.data;
};

export const fetchSearchProducts = async (search_item?: string) => {
  const res = await axios.get(
    `${URL}/search`,
    {
      params: search_item ? { search_item } : {},
    }
  );
  return res.data;
};

export const fectProductsById = async (id: any) => {
  console.log("params", id);
  const productsList = await axios.get(
    `${URL}/getProdById/${id}`,
  );
  console.log("works");
  return productsList.data;
};

export const addtocart = async (item: cartItem) => {
  console.log("item. ", item);
  const addItem = await axios.post(`${URL}/cart`, item, {
    withCredentials: true,
  });
  console.log("added item", addItem);
  return addItem;
};

export const getCartItem = async () => {
  const carItem = await axios.get(`${URL}/cartItem`, {
    withCredentials: true,
  });
  console.log("cartItem are ", carItem.data[0]);
  return carItem.data;
};

export const deleteCartItem = async (prod_id: any) => {
  const deletItem = await axios.delete(
    `${URL}/deletecartitem`,
    {
      data: {
        prod_id 
      },
      withCredentials: true,
    },
  );
  console.log("item deleted", deletItem)
  return deletItem.data;
};
