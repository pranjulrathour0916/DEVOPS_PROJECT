import {
  faAngleDown,
  faIndianRupee,
  // faStar, 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "./query/productsQuery.ts";
import Dropdown from "./resuable/Dropdown";
import { useMemo, useReducer, useState } from "react";
import Footer from "./Footer";
import Loader from "./resuable/Loader.jsx";

const initialState = {
  rating: null,
  price : 1000
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "Rating":
      return { ...state, rating: action.payload };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

const Proddetail = () => {
  const location = useLocation()
  const category = location.state;
  console.log("this is categoryid", category)

  // TanStack Query
  const { data = [], isPending, error } = useProducts(category);
  const maxPrice = 1000
  const [max, setmax] = useState(maxPrice);

  const navigate = useNavigate();



  //Reducer
  const [fitpro, setFitprod] = useReducer(filterReducer, { rating: null });


  // input value

  // Rating Filter
  const filterproducts = useMemo(() => {
    return data.filter((item) => {

    // Rating filter
    // if (fitpro.rating && Math.floor(item.rating.rate) !== fitpro.rating) {
    //   console.log("price filter",item.price, max)
    //   return false;
    // }

    // Price filter
    if (Number(item.price) > Number(max)) {
      return false;
    }
    
    return true;
  });
  }, [data, max]);

  

  // USestate for dropdown
  const [openId, setOpenId] = useState();

  // Part of Tanstack
  if (isPending) return <div><Loader/></div>;
  if (error) return <p>{error.message}</p>;

  const handleDropDown = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Nvaigate to next page
  const handlClick = (id) => {
    console.log("proddetail", id)
    navigate(`/selectprod/${id}`);
  };

  return (
    <>
      <div className="flex flex-row gap-2 p-2">
        <div className="  w-3/12 min-h-screen">
          <div className="flex flex-col p-2 gap-10">
            <div className="flex flex-row justify-between  w-full items-center">
              <p className="font-bold  text-lg">Filters</p>
              <p
                onClick={() => setFitprod({ type: "clear" })}
                className="text-blue-700 text-sm font-semibold"
              >
                Clear All
              </p>
            </div>
            <div className=" space-y-4">
              <p className=" text-sm">Categories</p>

              <p
                onClick={() => handleDropDown("footwear")}
                className="font-bold ml-3 "
              >
                Footwear <FontAwesomeIcon className="" icon={faAngleDown} />
              </p>
              {openId === "footwear" && <Dropdown id="footwear" />}
              <p
                onClick={() => handleDropDown("brand")}
                className="font-bold ml-3 "
              >
                Brand <FontAwesomeIcon className="" icon={faAngleDown} />
              </p>
              {openId === "brand" && <Dropdown id="brand" />}
              <p>Gender</p>
              <div className="space-y-1">
                <p>Price</p>
                <div className="slider flex flex-col   w-2/3">
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={max}
                    onChange={(e) => setmax(Number(e.target.value))}
                    className="bg-blue-500 appearance-none rounded-lg h-1"
                  />
                  <div className="flex text-sm flex-row justify-between">
                    <p>0</p>
                    <p>{max}</p>
                  </div>
                </div>
              </div>
              <div>
                <p>Rating</p>
                <ul className="">
                  <li className="flex items-center m-6 mt-2 gap-3">
                    <input
                      onChange={() =>
                        setFitprod({ type: "Rating", payload: 3 })
                      }
                      type="radio"
                      name="rating"
                      checked={fitpro.rating === 3}
                      className="scale-150"
                    />
                    <span>3 Rating</span>
                  </li>
                  <li className="flex items-center m-6 mt-2 gap-3">
                    <input
                      onChange={() =>
                        setFitprod({ type: "Rating", payload: 4 })
                      }
                      type="radio"
                      checked={fitpro.rating === 4}
                      name="rating"
                      className="scale-150"
                    />
                    <span>4 Rating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full min-h-screen p-2 space-y-4">
          <div className="perspective-[2000px]">
            <ul className="grid  grid-cols-4 bg-slate-100  gap-4 mx-5">
              {filterproducts.map((item) => (
                <li
                  onClick={() => handlClick(item.p_id)}
                  className="border shadow-[0_0px_20px_rgba(0,0,0,0.5)]  p-2 hover:shadow-xl flex flex-col text-black "
                  key={item.p_id}
                >
                  <p className="font-semibold">{item.p_name} </p>
                  <div className="flex justify-center p-2">
                    <img
                      src={item.img}
                      className="w-full object-contain h-36 bg-slate-400 p-2 rounded-md "
                      alt=""
                    />
                  </div>
                  <div className="text-left">
                    <div className="space-y-1 mx-2">
                      <p className="font-medium line-clamp-2">
                        {item.descrip}
                      </p>
                      {/* <p className="">
                        <span className="text-lg">{item.rating.count}</span>
                        <span className="font-medium text-xs">
                          {" "}
                          Bought in past two months
                        </span>
                      </p>
                      <div className="flex items-center gap-1">
                        <p>{item.rating.rate}</p>
                        {[...Array(Math.floor(item.rating.rate))].map(
                          (_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className="text-yellow-400"
                            />
                          )
                        )}
                      </div> */}
                      <p>
                        <span className="text-2xl font-bold">
                          <FontAwesomeIcon
                            className="text-sm"
                            icon={faIndianRupee}
                          />
                          {item.price}
                        </span>{" "}
                        <span className="text-sm">MRP</span>
                      </p>
                      {/* <p><span className="text-sm">Free Deliviery</span> <span className="font-bold">Wed,10 Dec</span></p> */}
                      {/* <button className="font-bold text-sm bg-yellow-300 p-2 rounded-full">Add to Cart</button> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Proddetail;
