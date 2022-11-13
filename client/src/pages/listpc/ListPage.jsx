import React, {useEffect} from 'react'
import Search from "./components/Search";
import Filter from "./components/Filter";
import {useDispatch, useSelector} from "react-redux";
import {getComputers} from "../../redux/features/computers/ComputersSlice";
import PCItem from "./components/PCItem";



function ListPage() {

    const {computers}  = useSelector((state)=>state.computers)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getComputers());
    }, [dispatch]);

    if (!computers.length){
        return <div className={'text-5xl flex flex-row justify-center my-10'}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
                 className="fill-[#00c78d] animate-spin w-14 h-14" viewBox="0 0 16 16">
                <path  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        </div>
    }


    return <div className={'my-16 text-white'}>


        <div className={'grid grid-cols-4 gap-5 grid-rows-2 relative mx-80 rounded-2xl h-[25rem] '}>
            <div className={'row-span-2  overflow-hidden  rounded-2xl store-bg  relative'}>


                <div className={'absolute -left-8 top-16 rotate-[-90deg] text-xl font-medium'}>
                    ОФИСНЫЕ
                </div>

            </div>

            <div className={'row-span-2 col-span-2 store-bg rounded-2xl relative cursor-pointer'}>
                <div className={'absolute right-12 top-16  text-xl font-medium'}>
                    ИГРОВЫЕ
                </div>

            </div>
            <div className={'store-bg rounded-2xl flex flex-col items-center justify-start p-4 cursor-pointer'}>
                <div>
                    ДЛЯ РАБОТЫ
                </div>
            </div>
            <div className={'store-bg rounded-2xl flex flex-col items-center justify-end p-4 cursor-pointer'}>
                <div>
                    ДЛЯ УЧЕБЫ
                </div>
            </div>


        </div>

        <Search/>

        <div className={'grid grid-cols-7 mx-20 mt-16'}>
            <Filter/>
            <div className={'col-span-6 grid grid-cols-3 gap-5'}>
                {
                    computers.map((item, key)=>{

                        return <PCItem key={key} props={item}  />
                    })
                }
            </div>
        </div>

    </div>
}

export default ListPage
