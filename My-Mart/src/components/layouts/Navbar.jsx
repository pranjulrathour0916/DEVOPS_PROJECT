import {
  faBasketShopping,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { useLogout, useMeLogin } from "./query/authentication.ts";
import { useQuery } from "@tanstack/react-query";
import { getCartItem } from "./query/fetcproducts.ts";
import Loader from "./resuable/Loader.jsx";

//   const [show, setShow] = useState(true)
// const navType = useSelector((state)=> state.navdisp.value)
// const dispatch = useDispatch()

// useEffect(() => {
//   const fetchCity = async () => {
//     try {
//       const res = await fetch("https://ipapi.co/json/");
//       const data = await res.json();
//       if (data && data.city) {
//         setCity(data.city);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchCity();

// }, []);
const Navbar = () => {
  const navigate = useNavigate();
  // const cart = useSelector((state)=> state.cart)

  
  const { data: user, isLoading } = useMeLogin();
  const { mutate: logoutUser } = useLogout();
  const { data: cart } = useQuery({
    queryKey: ["fecthcarttem"],
    queryFn: () => getCartItem(),
    enabled : !!user
  });

const handleLogout = () => {
 
  logoutUser(undefined,{
    onSuccess : ()=>{
      navigate('/login')
    }
  });
};

  const userName = user?.cust_name || "SignIn";
  if (isLoading) <div><Loader/></div>;

  const cartCount = cart?.length || 0

  const openCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-[#000000] z-50 top-0 left-0 sticky w-full text-white">
      <div className="flex flex-row justify-evenly p-1  items-center">
        <img
          src={logo}
          alt=""
          className="w-auto  object-contain h-20 rounded-full "
        />
        <div className="flex flex-row items-center hover:outline hover:outline-2 p-3">
          <FontAwesomeIcon className="mx-1" icon={faLocationDot} />
          <div className="flex flex-col">
            <p className="text-xs">Delivering to </p>
            <button>Update Location</button>
          </div>
        </div>
        <div className="w-1/3 flex flex-row justify-end items-center  ">
          <input
            type="text"
            name=""
            id=""
            className="w-full relative placeholder:text-center  text-black  rounded-lg p-1"
            placeholder="Mobile"
          />
          <FontAwesomeIcon
            className="absolute p-1 text-black"
            icon={faSearch}
          />
        </div>
        <div className="hover:border-white hover:outline hover:outline-2 p-1">
          <p className="text-sm">Hello </p>
          <Link to="/login" className="text-base">
            {userName}
          </Link>
        </div>
        <div className=" hover:outline hover:outline-2 p-1">
          <p>Orders</p>
        </div>
        <div onClick={openCart} className=" text-center p-1 ">
          <FontAwesomeIcon className="text-xl" icon={faBasketShopping} />
          <p className="text-sm">Cart {cartCount}</p>
        </div>
        <div>
         {user && <button onClick={handleLogout} className="hover:border-white hover:outline hover:outline-2 p-1">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
