import React, {useEffect, useState} from "react";

function RatingStars({props}) {

    const [rating, setRating] = useState(0)
    const rate =[1,1,1,1,1]

    useEffect(() => {

        if (props.length){

            let sumRating = 0

            props.forEach((item)=>{

                sumRating+=item.rate
            })

            setRating((rating)=>sumRating/props.length)
        }
    }, [props]);


    return <div className={'absolute flex flex-col space-y-1 right-20 top-16'}>
        {props.length?rate.map((item, key)=>{

            if (key<rating){
                return <svg key={key} xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            className="fill-[#00c78d]" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            }
            else {
                return <svg key={key} xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            className="fill-black" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            }
        }):null}
    </div>
}

function PCItem({props}) {


    return <div className={'flex flex-col relative'}>
        <RatingStars props={props.reviews} />
        <div>
            <img className={' object-scale-down blur-none w-8/12   '}
                 src={`http://localhost:3001/${props?.imagePCs[0].image}`}
                 alt={'img'}/>
        </div>
        <div className={'bg-black rounded-b-2xl px-4 py-4 flex flex-row items-center justify-between shadow-[0_3px_10px_0_rgba(0,0,0,0.3)]'}>
            <div className={'flex flex-col'}>
                <div className={'text-sm'}>
                    {props.type==='office'?'ОФФИСНЫЙ':
                        props.type==='game'? 'ИГРОВОЙ':
                            props.type==='study'?'УЧЕБНЫЙ':
                                'РАБОЧИЙ'} КОМПЬЮТЕР
                </div>
                <div className={'text-xs text-gray-400'}>
                    отзывов
                </div>
                <div className={'text-sm'}>
                    Цена {props.price}
                </div>
            </div>
            <button className={'flex flex-row bg-[#00c78d] rounded-xl px-2 py-2'}>
                <div> В корзину</div>
            </button>
        </div>
    </div>
}

export default PCItem