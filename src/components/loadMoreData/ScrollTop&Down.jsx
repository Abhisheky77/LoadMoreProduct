import { useRef, useState } from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ScrollTopBottom({ onscrollPercentage }) {
    let BottomRef = useRef(null)


    function handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function handleScrollBottom() {
        BottomRef.current.scrollIntoView({ behavior: "smooth" });

    }

    return (
        <div>
            <FaArrowCircleUp className=" fixed bottom-15 right-5  z-50  rounded-full shadow-lg hover:scale-110  transition cursor-pointer text-black" style={{
                color: `hsl(${200 + onscrollPercentage}, 90%, 50%)`,
            }} size={40} onClick={handleScrollTop} />

            <FaArrowCircleDown className=" fixed bottom-2 right-5 z-50 rounded-full shadow-lg hover:scale-110  transition cursor-pointer " style={{
                color: `hsl(${200 + onscrollPercentage}, 90%, 50%)`,
            }} size={40} onClick={handleScrollBottom} />
            <div ref={BottomRef}></div>
        </div>
    )
}
export default ScrollTopBottom