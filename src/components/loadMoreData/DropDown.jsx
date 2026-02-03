import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function DropDown({ data, Selected }) {

  function productCategory(val) {
    const CategoryProducts = data.filter((product) =>
      product.category.includes(val)
    );
    Selected(CategoryProducts);
  }

  return (

    <div className="w-full sm:w-auto sm:min-w-[200px] ">
      <Select onValueChange={productCategory}>
        <SelectTrigger className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="text-sm sm:text-base">
          <SelectGroup>
            <SelectLabel className="font-semibold">Products</SelectLabel>
            <SelectItem value="beauty">Beauty</SelectItem>
            <SelectItem value="fragrances">Fragrances</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="home-decoration">Home Decoration</SelectItem>
            <SelectItem value="kitchen-accessories">Kitchen Accessories</SelectItem>
            <SelectItem value="laptops">Laptops</SelectItem>
            <SelectItem value="mens-shirts">Mens Shirts</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
    </div>
    
  );
}

export default DropDown;