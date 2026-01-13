import { useState } from "react";
import { Button } from "../ui/button";


function SearchBox({ products, onSearch, onLength }) {
  const [searchText, setSearchText] = useState("");

  function searchProduct() {
    const searchProduct = products.filter((items) =>
      items.title?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      items.category?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      items.brand?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      items.tags?.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
    );
    onSearch(searchProduct);
    onLength(true);
  }

  function handleSearch() {
    searchProduct();
    setSearchText("");
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:flex-1">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full sm:flex-1 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
      />
      <div className="flex gap-2">
        <Button
          onClick={handleSearch}
          className="flex-1 sm:flex-none sm:px-6 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm sm:text-base font-medium transition-colors"
        >
          Search
        </Button>
        <button
          onClick={refresh}
          className="flex-1 sm:flex-none sm:px-6 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm sm:text-base font-medium transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default SearchBox;