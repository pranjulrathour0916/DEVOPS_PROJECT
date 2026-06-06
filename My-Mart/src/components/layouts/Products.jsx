import { useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useProducts } from "./query/productsQuery.ts";
import Loader from "./resuable/Loader.jsx";
import Errorpage from "./resuable/Errorpage.jsx";

const Products = ({categoryId}) => {
  const navigate = useNavigate();


  const {data, isPending, error } = useProducts(categoryId)
  const products = data ?? []

  const chunkedItems = useMemo(
    () => {
      const out = [];
      for (let i = 0; i < 16; i += 4) {
        out.push(products.slice(i, i + 4));
      }
      return out;
    }, // eslint-disable-next-line
    [data]
  );
  if(isPending)
    return <div><Loader/></div>
  if(error)
   return <div><Errorpage/></div>

const handleClick = (categoryId) => {
    console.log("singleprod", categoryId);
    navigate(`/prodetail`,{
      state : categoryId
    });
  };


  return (
    <>
     <p className="text-center text-2xl uppercase">Quick Check</p>
    <div className="grid grid-cols-4 rounded-xl  perspective-[4000px]  gap-4 mt-4 mx-5">
      {chunkedItems.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          className="   rounded-lg "
        >
          <div className="">
            <ul className="grid  grid-cols-2  perspective-1000 gap-4 p-4">
              {chunk.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleClick(item.cat_id)}
                  className="  p-2 transform-style-preserve-3d  rounded-xl   hover:scale-105 "
                >
                 
                  <img
                    src={item.img}
                    alt=""
                    className="w-60 h-32 rounded-lg   "
                  />
                  <p className="text-center text-xs line-clamp-2 font-semibold mt-4">
                    {item.descrip}
                  </p>
                 
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Products;
