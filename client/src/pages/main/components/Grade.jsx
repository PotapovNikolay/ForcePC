import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useSpring, animated, config, easings, useSprings} from '@react-spring/web'
import {useSelector} from "react-redux"
import {useDrag} from "@use-gesture/react";



function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting),
            ),
        [],
    );

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}


function ItemGrade({item}) {
    const refPosition = useRef(0);
    const isInViewport1 = useIsInViewport(refPosition);
    const [afterAnimation, setAfterAnimation] = useState(true)
    const [styleStartAnimation, apiStyleStartAnimation] = useSpring(() => ({from: {scale: 1, boxShadow:'0px 0px 0px 0px rgba(0,0,0,0)'}}))
    const newItem = item

    let countWithOutAnswer = 0
    let idQuestionWithOutAnswer = []


    useEffect(props => {
        if (isInViewport1 === true ) {
            apiStyleStartAnimation({
                to: [
                    {scale: 1},
                    {scale: 1.1, boxShadow: '0px 4px 30px 0px rgba(0, 199, 141, 0.7)',},
                    {scale: 1, boxShadow:'0px 3px 20px 0px rgba(0,0,0,0.4)'},
                ],
                config: {
                    duration: 300,
                    mass: 1,
                    tension: 180,
                    friction: 12,
                    clamp: false,
                    precision: 0.05,
                    velocity: 1,
                    easing: easings.easeInOutBounce,
                },
                delay:100,
                onRest:()=>{
                    setAfterAnimation(false)
                }
            })


        }
    },[isInViewport1,apiStyleStartAnimation])

    item.gradeqnas?.map((qna, key) => {
        if (qna.answer === null) {
            countWithOutAnswer++
            idQuestionWithOutAnswer.push(key)
        }
    })


    return <animated.div ref={refPosition} style={afterAnimation?styleStartAnimation:null}
        className={'flex flex-col basis-1/3 text-sm justify-center rounded-3xl p-3 pt-1 pb-4 shadow-[0_3px_10px_0_rgba(50,50,50,0.8)]  ' +
            ' transition ease-in-out hover:scale-105 hover:shadow-[0_3px_20px_0_rgba(100,100,100,0.3)] ' } >
        <div className={'bg-zinc-900 self-center w-1/2 h-3 rounded-full mb-2 '}/>
        {item.gradeqnas?.map((qna, key) => {

            return <div key={key.toString()} className={'grid grid-cols-2 gap-x-3 gap-y-1 justify-between '}>
                {
                    qna.question ?
                        <div className={'flex flex-row'}>
                            <div
                                className={'bg-[#00c78d] py-2 px-4 text-xs xl:text-normal ' + (parseInt(key) === idQuestionWithOutAnswer[0] ? ' rounded-r-2xl rounded-t-2xl' :
                                    parseInt(key) === idQuestionWithOutAnswer[idQuestionWithOutAnswer.length - 1] + 1 ? ' rounded-b-2xl rounded-r-2xl ' :
                                        idQuestionWithOutAnswer.includes(parseInt(key)) ? '  rounded-r-2xl ' :
                                            ' rounded-r-2xl rounded-t-2xl')}>
                                {qna.question}
                            </div>
                        </div>

                        : null
                }
                <div/>
                <div/>
                {
                    qna.answer ?
                        <div className={'flex flex-row justify-end mt-2'}>
                            <div className={'bg-[#333333] py-2 px-4 rounded-l-2xl rounded-t-2xl text-xs xl:text-normal'}>
                                {qna.answer}
                            </div>
                        </div>
                        : null
                }

            </div>
        })}

    </animated.div>

}

function Grade({grades}) {

    const screenWidth = window.screen.width
    console.log(grades)

    return <div  className={'mt-44 ' +
        ' xl:grid xl:grid-cols-12  xl:mx-10xl: pb-14 xl:mt-10 xl:snap-center'}>
        <div className={'xl:col-span-12 '}>
            <div className={'text-xl xl:text-4xl text-center text-white font-medium'}>
                РЕКОМЕНДАЦИИ
            </div>
        </div>
        <div className={'px-10 xl:px-0  xl:col-span-6 xl:col-start-4 xl:mt-10  '}>
            <div className={'text-sm xl:text-2xl text-center text-white'}>
                В данном разделе вы можете задать интересующие вас вопросы представителям магазина по поводу комплектующих для сбора нового или же
                апгрейда настоящего компьютера
            </div>
        </div>
        <div  className={'mt-4  ' +
            ' xl:col-span-10 xl:col-start-2 xl:mt-16 '}>
            <div className={'flex flex-row m-0 ' +
                '  text-white space-x-16'}>
                { screenWidth > 450? grades?.slice(0).reverse().map((grade, key) => {
                    return <ItemGrade key={key.toString()} item={grade}/>
                }) :
                    grades?.map((grade, key) => {
                        return key===0?<ItemGrade key={key.toString()} item={grade}/>:null
                    })
                }

            </div>
        </div>

    </div>

}

export default Grade