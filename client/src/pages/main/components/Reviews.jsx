import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {getAllItems} from "../../../redux/features/main/MainSlice";

function ItemReview({item, index, isHover, isUnHover}) {

    const [review, setReview] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [firstShown, setFirstShown] = useState(false);

    useEffect(()=>{
        setReview(item)
        if (index===0){
            setFirstShown(true)
        }
    }, [item])

    useEffect(()=>{
        if (isHover===true){
            setFirstShown(false)
        }
        if (isUnHover===false && index===0){
            setFirstShown(true)
        }
    }, [isHover,isUnHover])

    if (!review){
        return <div className={'text-5xl flex flex-row justify-center'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 className="fill-[#00c78d] animate-spin w-16 h-16" viewBox="0 0 16 16">
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        </div>
    }

    const rate1 = new Array(5).fill(0)
    const rate2 = new Array(review?.reviews[0].rate).fill(1)
    const rate = rate2.concat(rate1).slice(0,5)



    return <div onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} className={'flex flex-col relative space-y-6 group  '}>
        <div className={'  group-hover:duration-300 group-hover:duration-500 ' +
            ' group-hover:listPCNav-green-line relative z-0 ' + (firstShown?' listPCNav-green-line z-10' :' listPCNav-gray-line')}>

        </div>
        <div className={'relative  z-0 group-hover:z-10 flex flex-col group-hover:duration-300 group-hover:bg-zinc-900  ' +
            ' group-hover:scale-105 group-hover:rounded-2xl  group-hover:shadow-[0_0_10px_0_rgba(150,150,150,0.6)] '+
            ( firstShown?' bg-zinc-900 rounded-2xl relative z-20 shadow-[0_0_10px_0_rgba(150,150,150,0.6)]  scale-105':' ')}>
            <div className={'bg-black text-white  flex flex-row group-hover:rounded-t-2xl group-hover:-translate-y-1.5 '+
                (firstShown?'rounded-t-2xl -translate-y-1.5':'')}>
                <div id={'review-scroll'} className={'my-6 px-6 h-60 overflow-y-scroll cursor-default'}>
                    {review?.reviews[0].text}
                </div>
                <div className={'absolute right-[1px] border-green-line group-hover:invisible ' +(firstShown?'invisible ':'')}/>

            </div>
            {
                isShown || firstShown?
                    <div className={'flex flex-col space-y-2 px-6 pb-4 pt-1'}>
                        <div className={'text-white text-lg'}>
                            {review?.name} {review?.sername}
                        </div>
                        <div className={'flex flex-row items-center justify-between'}>
                            <div className={'text-[#00c78d] text-sm'}>
                                Офисная сборка
                            </div>
                            <div className={'flex flex-row space-x-1'}>
                                {
                                    rate.map((item, key)=> {
                                        if (item===1){
                                            return <div key={key}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                      className="fill-[#00c78d] w-5 h-5"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                            </div>
                                        }
                                        else {
                                            return <div key={key}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="fill-[#00c78d] w-5 h-5" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                            </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :null
            }
        </div>

    </div>
}

function Reviews() {
    const [hover, setHover] = useState(false)
    const [review, setReview] = useState([])
    const {reviews} = useSelector((state) => state.main)
    const [isShown, setIsShown] = useState(false);
    const [isShownDiv, setIsShownDiv] = useState(true);

    useLayoutEffect(() => {
        setReview(reviews)
    }, [reviews]);


    if (!review.length) {
        return <div className={'text-5xl flex flex-row justify-center'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 className="fill-[#00c78d] animate-spin w-16 h-16" viewBox="0 0 16 16">
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        </div>
    }


    return <div className={'grid grid-cols-7 my-16 mb-20 h-[25rem] place-items-center'}>
        <div className={'col-span-3 flex flex-row justify-center'}>
            <div className={'flex flex-col space-y-8  '}>
                <div className={'flex flex-col space-y-4'}>
                    <div className={'text-4xl text-white font-medium'}>
                        ОТЗЫВЫ
                    </div>
                    <div className={'text-white   text-xl'}>
                        Мы довольны если <br/> довольны наши клиенты
                    </div>
                </div>
                <button className={'text-black py-3 px-5 rounded-2xl bg-[#00c78d] font-medium text-xl w-9/12 '}>
                    Увидеть все
                </button>
            </div>
        </div>

        <div onMouseEnter={() => setIsShownDiv(true)}
            onMouseLeave={() => setIsShownDiv(false)}
            className={'col-span-4 grid grid-cols-3 '}>
            {
                review?.slice(0).reverse().map((item, key) => {
                    return <div key={key} onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)} >
                        <ItemReview isHover={isShown} isUnHover={isShownDiv}  index={key} item={item}/>
                    </div>
                })
            }
        </div>
    </div>

}

export default Reviews