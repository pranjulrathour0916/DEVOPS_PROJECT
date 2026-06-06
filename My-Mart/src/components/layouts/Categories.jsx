import { useState } from "react";


const Categories = ({setCategoryId}) => {
    
    const [active, setActive] = useState(0)
    const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Men" },
    { id: 2, name: "Jewellery" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Women" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Toys" },
    { id: 7, name: "Beauty" },
    { id: 8, name: "Kids" },
    { id: 9, name: "Groceries" },
    { id: 10, name: "Fruits" }
  ];
  
  const handlClick = (id) =>{
    setActive(id)
    setCategoryId(id)
    console.log("this is cat id", id)
  }

  return (
    <div className='border border-white bg-gray-400'>
     <div>
        <ul className='flex flex-row justify-around items-center [&>li]:rounded-lg font-semibold tracking-wide [&>li]:p-1 text-white text-sm'>
           {
            categories.map((cat, index)=>(
                <li key={cat.id}
                onClick={()=>handlClick(index)} 
                className={active === cat.id ? "bg-white text-black" : "hover:bg-white hover:text-black"}>{cat.name}</li>
            ))
           }
        </ul>
     </div>
    </div>
  )
}

export default Categories
