import {
  addtocart,
  cartItem,
  deleteCartItem,
  fectProducts,
  fectProductsById,
  getCartItem,
} from "./fetcproducts.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = (id: any) => {
  return useQuery({
    queryKey: ["allPproductsList", id],
    queryFn: () => fectProducts(id),
  });
};

export const useGetProduct = (id: any) => {
  return useQuery({
    queryKey: ["allPproductsList", id],
    queryFn: () => fectProductsById(id),
  });
};

export const useAdditem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: cartItem) => addtocart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fecthcarttem"] });
    },
  });
};

export const useCartItem = () => {
  return useQuery({
    queryKey: ["fecthcarttem"],
    queryFn: () => getCartItem(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prod_id) => deleteCartItem(prod_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fecthcarttem"],
      });
    },
  });
};
