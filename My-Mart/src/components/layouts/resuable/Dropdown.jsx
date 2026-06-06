
const Dropdown = ({id}) => {

  const dropdowns = [
  {
    id: "footwear",
    label: "Footwear",
    options: [
      "Women's Footwear",
      "Kid and Infant Footwear",
      "Men's Footwear"
    ]
  },
  {
    id: "brand",
    label: "Brand",
    options: [
      "Puma",
      "Nike",
      "Adidas",
      "Bacca Bucci",
      "Bata"
    ]
  }
];

const filterDropdown = dropdowns.find((item)=> item.id === id)

  return (
    <div>
      <div>
        {console.log("id", id, filterDropdown.options)}
              <ul
              className={`text-sm flex justify-center flex-col  items-center flex-wrap mt-2 gap-2`}>
                {filterDropdown.options.map((item)=>(
                    <li className="hover:underline">{item}</li>
                ))}
              </ul>
            </div>
    </div>
  )
}

export default Dropdown
