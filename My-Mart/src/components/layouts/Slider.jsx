import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useProducts } from "./query/productsQuery.ts";
import { useNavigate } from "react-router-dom";
import Loader from "./resuable/Loader.jsx";
import Errorpage from "./resuable/Errorpage.jsx";

const Slider = ({categoryId}) => {
  const navigate = useNavigate()
  const {data, isPending, error} = useProducts(categoryId)
  const slideRef = useRef(null);
  if(isPending)
    return <div><Loader/></div>
  if(error)
    return <div><Errorpage/></div>


  const scrollLeft = () => {
    if (!slideRef.current) return;
    slideRef.current.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!slideRef.current) return;
    slideRef.current.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };
const handleClick = (categoryId) => {
    console.log("singleprod", categoryId);
    navigate(`/prodetail`,{
      state : categoryId
    });
  };
  return (
    <div className="mt-10 mx-5 shadow-[0_0px_10px_rgba(0,0,0,0.5)] rounded-lg bg-transparent ">
        <p className="text-xl   font-bold mx-5 py-2 uppercase">More Items to Consider</p>
      <div className="products relative snap-x snap-mandatory ">
        <ul ref={slideRef}  className="flex flex-row overflow-x-auto gap-32">
          {data.map((item) => (
            <img
              src={item.img}
              key={item.p_id}
              onClick={() => handleClick(item.cat_id)}
              className="w-full h-36 py-3 object-contain snap-start hover:scale-110"
              alt=""
            />
          ))}
        </ul>
        <button
          onClick={scrollLeft}
          className="absolute bg-white rounded-full -translate-y-1/2 text-3xl top-1/2 left-0 p-1"
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute bg-white rounded-full -translate-y-1/2 text-3xl top-1/2 right-0 p-1"
        >
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
