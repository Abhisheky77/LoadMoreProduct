import { Item } from "@radix-ui/react-select";

function Suggesstions({data ,handleClick}){
    return <ul className=" max-h-60 overflow-y-auto">
       {
        data && data.length ?
        data.map((item, index )=>  <li key={index} onClick={handleClick} 
            className=" px-8 py-3 cursor-pointer  hover:bg-gray-100 hover:rounded-2xl transition  "
          >{item}</li>) :(
        <li className="px-5 py-5 text-gray-500">
          No results found
        </li>
      )
       }
    </ul>
} 
export default Suggesstions;