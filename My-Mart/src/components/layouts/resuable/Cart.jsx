import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupee,
  faPlus,
  faSubtract,
} from "@fortawesome/free-solid-svg-icons";
// import { removeItem } from '../../../redux/cartSlice'
import {
  useAdditem,
  useCartItem,
  useDeleteCartItem,
} from "../query/productsQuery.ts";
import Loader from "./Loader.jsx";

const Cart = () => {
  const item = {
    prodId: "",
    quantity: 1,
  };
  const decItem = {
    prodId: "",
    quantity: -1,
  };
  const { data, isPending, isSuccess } = useCartItem();
  const { mutate } = useAdditem();
  const { mutate: dele } = useDeleteCartItem();
  const cartData = Array.isArray(data) ? data : [];
  const count = cartData.reduce((acc, it) => {
    return acc + Number(it.prod_quantity);
  }, 0);
  // const count = 0;
  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.prod_quantity * item.prod_price,
    0,
  );
  // const totalPrice = 0;
  const discount = 40;
  const platformfee = 7;
  const coupoun = 4;
  const totalamount = totalPrice - discount - coupoun + platformfee;

  if (isPending) return <div><Loader/></div>;

  if (isSuccess) console.log("this is", data);

  const addQuantity = (id) => {
    item.prodId = id;
    console.log("this is item", item);
    mutate(item, {
      onSuccess: (data) => {
        // notify();

        console.log("this is success data ", data);
      },
    });
  };

  const subQuantity = (id, quantity) => {
    decItem.prodId = id;
    if (quantity <= 1) {
      dele(id, {
        onSuccess: (data) => {
          console.log("succcess deleted ", data);
        },
      });
      console.log("this is item ", decItem);
    } else {
      mutate(decItem, {
        onSuccess: (data) => {
          // notify();
          console.log("this is success data ", data);
        },
      });
    }
  };

  const removeItem = (id) => {
    console.log("this is id,", id);
    dele(id, {
      onSuccess: (data) => {
        console.log("succcess deleted ", data);
      },
    });
  };

  return (
    <div>
      <div className=" text-black mt-14 flex flex-row justify-around mx-10  gap-2">
        <div className="w-3/4 flex flex-col gap-1">
          <div className="addres bg-white text-sm font-semibold border p-3 flex flex-row items-center justify-between px-5">
            <p>Saved Address</p>
            <button className="border border-black text-xs p-2 text-blue-500 font-semibold">
              Enter Delivery Pincode
            </button>
          </div>
          {cartData.map((item, index) => (
            <div key={index} className="cart bg-white py-2 ">
              <div className="">
                <div className="flex border shadow-sm shadow-black flex-row 2 p-2 gap-5 mx-6 mt-2">
                  <div className="image  p-2">
                    <img src={item.prod_img} className="w-20 h-20" alt="" />
                  </div>
                  <div className="desc w-full space-y-1">
                    <div className="text-sm font-semibold flex  justify-between">
                      <p className="">{item.prod_title}</p>
                      <p className="text-gray-500"> Delivered by Mon Dec 2</p>
                    </div>
                    <p className="text-slate-500 text-sm">Size 10, White 10</p>
                    <p>Seller : BRUTONFOOTWEAR</p>
                    <div className="price flex items-center gap-3 py-4">
                      <p className="text-xs line-through">
                        <FontAwesomeIcon icon={faIndianRupee} /> 2499
                      </p>
                      <span>
                        <FontAwesomeIcon icon={faIndianRupee} />
                        <span className="text-xl">
                          {item.prod_price * item.prod_quantity}
                        </span>
                      </span>
                      <span className="text-green-600 text-xs">82 % Off</span>
                    </div>
                    <div className="flex gap-10">
                      <div className="flex gap-4">
                        <FontAwesomeIcon
                          className="border p-1 rounded-full"
                          onClick={() =>
                            subQuantity(item.prod_id, item.prod_quantity)
                          }
                          icon={faSubtract}
                        />
                        <span className="border px-6">
                          {item.prod_quantity}
                        </span>
                        <FontAwesomeIcon
                          className="border p-1 text-sm rounded-full"
                          onClick={() => addQuantity(item.prod_id)}
                          icon={faPlus}
                        />
                      </div>
                      <span onClick={() => removeItem(item.prod_id)}>
                        REMOVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="  bg-white py-3 flex justify-end ">
            <p className="text-white font-semibold w-1/6 mx-5 text-center bg-orange-400 text-sm  p-4 px-5">
              PLACE ORDER
            </p>
          </div>
        </div>
        <div className="price border bg-white text-black  w-1/3 ">
          <div className="flex p-3 flex-col gap-3">
            <div>
              <p className="text-gray-700">PRICE DETAILS</p>
            </div>
            <div>
              <ul className="font-normal flex  flex-col gap-5">
                <li className="flex justify-between  ">
                  <div className="flex gap-5">
                    <span>Price</span>
                    <span> ({count} items)</span>
                  </div>
                  <p>
                    <FontAwesomeIcon icon={faIndianRupee} />
                    {Math.floor(totalPrice)}
                  </p>
                </li>
                <li className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">
                    <FontAwesomeIcon className="text-sm" icon={faIndianRupee} />
                    -{discount}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Coupouns for you</span>
                  <span className="text-green-600">
                    <FontAwesomeIcon className="text-sm" icon={faIndianRupee} />
                    -{coupoun}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>
                    <FontAwesomeIcon className="text-sm" icon={faIndianRupee} />
                    {platformfee}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex justify-between mt-3 border-t-2 py-2">
              <span>Total Amount</span>
              <span>{Math.floor(totalamount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
