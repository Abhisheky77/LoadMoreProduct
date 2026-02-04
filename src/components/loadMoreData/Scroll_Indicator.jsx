import { useEffect } from "react";

function ScrollIndicator({onScroll}){
    function handleScrollIndicator(){
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;

        const hight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const percentage = ((scrolled / hight)*100);
        console.log(percentage);
        onScroll(percentage);
    }

    useEffect(()=>{
        window.addEventListener('scroll',handleScrollIndicator);

        return ()=>{
            window.removeEventListener('scroll',handleScrollIndicator);
        }
    },[])
    return null;
}
export default ScrollIndicator;