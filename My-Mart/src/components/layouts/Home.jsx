import { AnimatePresence, motion } from "framer-motion";
import shoes from "../../assets/shoes.png";
import clothes from "../../assets/clothes.png";
import mobile from "../../assets/mobile.png";
import { useEffect, useState } from "react";
import Products from "./Products";
import Slider from "./Slider";
import SingleProd from "./SingleProd";
import Footer from "./Footer";

const Home = ({categoryId}) => {
  const [index, setIndex] = useState(0);
 
 

  const slides = [
    { id: 1, title: "Smartphones", price: "6999", img: mobile, width: 90 },
    { id: 2, title: "Clothes", price: "699", img: clothes, width: 200 },
    { id: 3, title: "Shoes", price: "699", img: shoes, width: 200 },
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
  
    return () => clearInterval(id);
  });
  const current = slides[index];
  return (
    <>
      <div
        className=" text-black   flex justify-center items-center mt-5 shadow-lg  border-slate-100 h-52 mx-11 rounded-3xl bg-transparent"
        style={{ perspective: 3000 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.6 }}
            className="absolute flex gap-10 items-center"
          >
            <p className="text-4xl font-bold">{current.title}</p>
            <motion.img
              whileHover={{ scale: 1.2 }}
              style={{ transformStyle: "preserve-3d" }}
              className="mix-blend-multiply"
              src={current.img}
              width={current.width}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="products mt-10 ">
        <Products categoryId={categoryId} />
      </div>
      <div>
        <Slider categoryId={categoryId} />
      </div>
      <div className="mt-10">
        <SingleProd categoryId={categoryId} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
