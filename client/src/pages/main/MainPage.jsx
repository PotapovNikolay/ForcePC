import Top from "./components/Top";
import NavCards from "./components/NavCards";
import ListPC from "./components/ListPC";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllItems} from "../../redux/features/main/MainSlice";
import Grade from "./components/Grade";
import Custom from "./components/Custom";
import Reviews from "./components/Reviews";

function MainPage() {

    const {menu} = useSelector((state)=>state.main)
    const {computers, reviews, grades, cases}= useSelector((state)=> state.main)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllItems())
    }, [dispatch]);

    if (!computers.length||!reviews.length || !grades.length){
        return <div className={'text-5xl flex flex-row justify-center my-10'}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
                 className="fill-[#00c78d] animate-spin w-14 h-14" viewBox="0 0 16 16">
                <path  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        </div>
    }


    return<div className={'font-Montserrat w-screen overflow-hidden relative z-10 xl:pt-20 pt-10'+(menu?` invisible`:'')}>
        <Top/>
        <NavCards/>
        <ListPC computers={computers} />
        <Grade grades={grades}/>
        <Custom cases={cases} reviews={reviews}/>
        <Reviews/>
    </div>
}

export default MainPage
