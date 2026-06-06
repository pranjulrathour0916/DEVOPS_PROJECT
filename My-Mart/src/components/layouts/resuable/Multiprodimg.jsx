import shoes1 from "../../../assets/shoes1.png";
import shoes2 from "../../../assets/shoes2.png";
import shoes3 from "../../../assets/shoes3.png";
import shoes4 from "../../../assets/shoes4.png";
import shoes5 from "../../../assets/shoes5.png";
const images = [shoes1, shoes2, shoes3, shoes4, shoes5];


const Multiprodimg = () => {
  return (
   <div className="">
    <div className="flex  gap-2">
    <div className="short ml-20  mt-3  w-20 images">
        <ul className="flex flex-col gap-2">
           {
            images.map((item, index)=>(
                 <li key={index} className="border">
                <img src={item} className="w-full h-16 p-1 object-contain" alt="" />
            </li>
            ))
           }
           
        </ul>
    </div>
    <div className="main mt-3  border w-4/12  image">
   <div className="flex relative overflow-x-auto gap-20 border p-2">
           {images.map((item, index)=>(

        <img key={index} src={item} className="object-contain " alt="" />

   ))}
   </div>
    </div>
    </div>
   </div>
  );
};

export default Multiprodimg;
