import { useEffect, useState } from "react"
import { PiCurrencyDollarSimpleFill, PiTarget } from "react-icons/pi"
import { MdStars } from "react-icons/md";
import DropDown from "./DropDown";
import SearchBox from "./SearchBox";
import ScrollIndicator from "./Scroll_Indicator";
import ScrollTopBottom from "./ScrollTop&Down";
import {ThreeDots } from "react-loader-spinner";

function LoadMoreData() {

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [searchlength, setSearchlength] = useState(false);
    const [filterProducts, setfilterProducts] = useState(products);
    const [scrollPercentage, setScrollPercentage] = useState(0)




    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch(` https://dummyjson.com/products?limit=10&skip=${count == 0 ? 0 : count * 20}`);
            const result = await response.json();
            console.log(result);
            if (result && result.products && result.products.length) {


                setProducts((prevData) => {
                    const newProducts = result.products.filter(
                        (newItem) => prevData.every(oldItem => oldItem.id !== newItem.id)
                    );
                    return [...prevData, ...newProducts];
                });

                setfilterProducts((prevData) => {
                    const newProducts = result.products.filter(
                        (newItem) => !prevData.some(oldItem => oldItem.id === newItem.id)
                    );
                    return [...prevData, ...newProducts];
                });
                setLoading(false);
                // setfilterProducts(result.products);
            }

        } catch (e) {
            console.log(e);
            setCount(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [count])

    function handleSearchProduct(data) {
        setfilterProducts(data)
    }
    function handleSearchLength(data) {
        setSearchlength(data)
    }

    function handleSelectedProduct(data) {
        setfilterProducts(data)
    }
    if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
     <span className="flex items-center gap-3 text-3xl font-bold text-orange-600">
  Loading
  <ThreeDots height={32} width={64} color="#ea580c" ariaLabel="loading"/>
</span>
    </div> );
}

    function handleScrollPercentage(value) {
        setScrollPercentage(value);
    }

    return (
        <div className=" flex flex-col justify-center items-center mt-10">
            <div className=" bg-white  shadow-2xl sticky top-0 z-20 rounded-lg">
                <div className=" px-5 pb-2 pt-5">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <SearchBox
                                products={products}
                                onSearch={handleSearchProduct}
                                onLength={handleSearchLength}
                            />
                            <DropDown
                                data={products}
                                Selected={handleSelectedProduct}
                            />
                        </div>
                    </div>
                </div>
                <ScrollIndicator onScroll={handleScrollPercentage} />
                <div className="mt-3 w-full h-[5px] bg-gray-200 rounded-b-3xl overflow-hidden">
                    <div
                        className="h-full transition-all duration-200 ease-out"
                        style={{
                            width: `${scrollPercentage}%`,
                            background: "linear-gradient(90deg, #38bdf8, #0ea5e9, #2563eb)",
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
                {
                    filterProducts && filterProducts.length ?
                        filterProducts.map((productsItem) =>
                            <div className=" w-85 max-h-100 flex flex-col items-center rounded-2xl shadow-lg  bg-gradient-to-br from-slate-50 to-gray-100   " key={productsItem.id}>
                                <div className="w-full h-[150px] flex items-center justify-center mt-6 mb-6">
                                    <img className="w-48 h-44 object-contain mt-7 mb-7 " src={productsItem.images[0]} alt={productsItem.title} />
                                </div>

                                <div className=" w-full h-58 rounded-2xl py-3 px-3 bg-white shadow-lg ">
                                    <div className=" flex justify-between">
                                        <span>{productsItem.category}</span>
                                        <span className={`${productsItem.availabilityStatus === "In Stock" ? "bg-green-600 text-white rounded-lg w-17  h-7 flex justify-center shadow-md " : "bg-red-600  text-white rounded-lg w-22 h-7 flex justify-center items-center font-semibold shadow-sm text-sm"}`}>{productsItem.availabilityStatus}</span>
                                    </div>

                                    <p className=" font-semibold text-md text-black mb-2">{productsItem.title}</p>
                                    <pre className=" flex items-center gap-2 text-md font-semibold text-gray-900 mb-2"><PiCurrencyDollarSimpleFill className="text-2xl text-yellow-500" />   {productsItem.price}</pre>
                                    <span className=" flex items-center gap-2 mb-2 text-md font-semibold"><MdStars className="text-2xl text-yellow-500 " />{productsItem.rating} </span>
                                    <button className=" w-full h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md duration-300 hover:scale-95 cursor-pointer">Add to cart</button>
                                </div>

                            </div>
                        ) : null
                }
                <div className="">
                    <ScrollTopBottom  onscrollPercentage={scrollPercentage}/>
                </div>
            </div>
            <div className=" flex justify-between items-center">
                {
                    searchlength == false && (
                        <button
                            onClick={() => setCount(count + 1)}
                            className=" border w-50 h-10  rounded-lg bg-red-700 hover:bg-red-500 text-white  duration-300 hover:scale-110 mb-5 cursor-pointer"
                        >Load more products....</button>
                    )
                }       
            </div>
        </div>
    )
}
export default LoadMoreData