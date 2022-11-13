import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useSpring, useSprings, animated, config} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import {useTrail} from "react-spring";


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


function ItemPC({item, id}) {

    const ref = useRef(0);
    const refHeight = useRef(1);
    const refPosition = useRef(0);
    const [widthDiv, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [leftSide, setLeftSide] = useState(false)
    const [rigthSide, setRightSide] = useState(false)
    const [main, setMain] = useState(null)
    const [loading, setLoading] = useState(false)
    const screenWidth = window.screen.width
    const isInViewport1 = useIsInViewport(refPosition);

    // const h = ()=> refHeight.current.offsetHeight
    // const height = useMemo(()=>h(),[])


    useEffect(() => {
        setMain(item.imagePCs[0])
    }, [item])

    useEffect(() => {
        setRightSide(false)
        setLeftSide(false)
    }, [item])

    useEffect(() => {
        if (ref.current.offsetWidth !== null) {
            setWidth(ref.current.offsetWidth);
        }
    }, [item, widthDiv, leftSide])


    useEffect(() => {
        setHeight(1)
        if (refHeight.current) {
            setHeight(refHeight.current.offsetHeight)
        }

    }, [item, height])


    const [style, api] = useSpring(() => ({x: 0}))
    const [styleDescription, apiDescription] = useSpring(() => ({width: widthDiv}))
    const [styleCol, apiStyleCol] = useSpring(() => ({from: {opacity: 0}}))
    const [styleStartAnimation, apiStyleStartAnimation] = useSpring(() => ({
        from: {
            x: id % 2 === 0 ? 200 : -200,
            scale: 1,
            boxShadow: '1px 0px 0px 0px rgba(0,0,0,0)'
        }
    }))


    useEffect(() => {
        if (isInViewport1 === true && loading === false) {
            apiStyleStartAnimation({
                to: [
                    {x: id % 2 === 0 ? 100 : -100, scale: 1},
                    {x: id % 2 === 0 ? 50 : -50, scale: 1.03, boxShadow: '0px 2px 10px 0px rgba(0, 199, 141, 0.2)',},
                    {x: id % 2 === 0 ? 0 : 0, scale: 1.02, boxShadow: '0px 2px 10px 0px rgba(0, 199, 141, 0.2)'},
                    {x: id % 2 === 0 ? 0 : 0, scale: 1, boxShadow: '0px 2px 20px 0px rgba(0,0,0,0.3)'}
                ],
                config: {
                    duration: 165,
                    mass: 1,
                    tension: 180,

                    friction: 12,
                    clamp: false,
                    precision: 0.05,
                    velocity: 1,
                },
                delay: 100
            })
            setLoading(true)
        }

    }, [isInViewport1, apiStyleStartAnimation])

    useEffect(() => {
        api({x: 0})
    }, [item, api])

    useEffect(() => {
        apiDescription({
            width: widthDiv
        })
    }, [item, widthDiv, apiDescription])

    useEffect(() => {
        apiStyleCol({
            to: {opacity: leftSide ? 1 : 0},
            config: config.stiff
        })
    }, [leftSide, item, apiStyleCol])

    const bind = useDrag(({down, offset: [mx, mw]}, dragging) => {
        api.start({x: down ? mx : mx > widthDiv / 2 ? widthDiv : mx < widthDiv / 2 && mx > -widthDiv / 2 ? 0 : mx < -widthDiv / 2 ? -widthDiv : null,})

        apiDescription.start({
            width: down && mx > widthDiv / 2 ? setLeftSide(true) :
                !down && mx === widthDiv ? setLeftSide(true) :
                    mx < widthDiv / 2 && mx > -widthDiv / 2 ? setLeftSide(false) :
                        null

        })

        apiDescription.start({
            width: down && mx < -widthDiv / 2 ? setRightSide(true) :
                mx < widthDiv / 2 && mx > -widthDiv / 2 ? setRightSide(false) :
                    null
        })
        apiDescription.start({
                width:
                    down ? widthDiv + mx :
                        mx > widthDiv / 2 ? 2 * widthDiv
                            : mx < -widthDiv / 2 ? 0
                                : mx < widthDiv / 2 || mx > -widthDiv / 2 ? widthDiv
                                    : null
            }
        )

    }, {
        bounds: {left: -widthDiv, right: widthDiv},
    })

    // if (item.imagePCs === []) {
    //     return <div>Данные загружаются</div>
    // }


    return <animated.div ref={refPosition} style={styleStartAnimation}
                         className='grid grid-cols-2 bg-zinc-800 rounded-2xl  relative  overflow-hidden'>
        <animated.div {...bind()} style={styleDescription}
                      className='bg-[#09090A] rounded-2xl h-full absolute z-10 '/>
        <div ref={ref} className={'rounded-2xl relative z-20 '}>
            <animated.button {...bind()} style={style}
                             className='w-6 h-6 bg-[#00c78d] rounded-full xl absolute z-50 -right-3 top-[49%] flex flex-row justify-center items-center -space-x-1 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className="fill-black w-3" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className="fill-black w-3  " viewBox="0 0 16 16">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </animated.button>
            {
                rigthSide ? <div style={{height: height}}
                                 className={'flex flex-col justify-center items-center flex-wrap  h-[' + height + 'px]  relative '}>
                        <div className={'w-full h-full bg-zinc-700 blur-sm opacity-50 rounded-2xl absolute'}/>
                        {item.imagePCs?.filter(x => x.id !== main.id).map((item, id) => {
                            return <button key={id.toString()} onClick={() => setMain(item)}
                                           className={'bg-zinc-900 rounded-2xl w-28 h-28 cursor-pointer my-4 p-1 border-[1px] border-gray-300  '}>
                                <img className={' object-scale-down blur-none'} src={`http://localhost:3001/${item.image}`}
                                     alt={'img'}/>
                            </button>

                        })}
                    </div>
                    :
                    <div ref={refHeight} className={'flex flex-col justify-start space-y-5  py-5 px-4   pl-8'}>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line '}/>
                                <div className={'font-light text-sm xl:text-base text-gray-300 '}>
                                    Процессор
                                </div>
                            </div>
                            <div className={'ml-3 xl:text-lg '}>
                                {item.CPU}
                            </div>
                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line'}/>
                                <div className={'font-light text-sm xl:text-base text-gray-300 '}>
                                    Оперативная память
                                </div>
                            </div>
                            <div className={'ml-3 xl:text-lg '}>
                                {item.RAM}
                            </div>
                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line'}/>
                                <div className={'font-light text-sm xl:text-base text-gray-300 '}>
                                    Видеокарта
                                </div>
                            </div>
                            <div className={'ml-3 xl:text-lg '}>
                                {item.GPU}
                            </div>
                        </div>
                        {
                            screenWidth > 450 ?
                                <div className={'flex flex-col'}>
                                    <div className={'flex flex-row space-x-2'}>
                                        <div className={'magazin-item-line'}/>
                                        <div className={'font-light text-sm xl:text-base text-gray-300 '}>
                                            Накопитель
                                        </div>
                                    </div>
                                    <div className={'ml-3 xl:text-lg'}>
                                        {item.memory}
                                    </div>
                                </div> : null}
                        {
                            screenWidth > 450 ? <div className={'flex flex-col '}>
                                <div className={'flex flex-row space-x-2'}>
                                    <div className={'magazin-item-line'}/>
                                    <div className={'font-light text-sm xl:text-base text-gray-300 '}>
                                        Блок питания
                                    </div>
                                </div>
                                <div className={'ml-3 xl:text-lg '}>
                                    {item.power}
                                </div>
                            </div> : null}
                    </div>
            }
        </div>
        {
            leftSide ? <div
                    className={'relative z-10  rounded-2xl flex flex-col justify-between transition ease-in-out duration-150 '}>
                    <animated.div style={styleCol} className={'flex flex-col   space-y-5   justify-start   '}>
                        <button className={'absolute invisible'}/>
                        <div className={'flex flex-col '}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line '}/>
                                <div className={'font-light text-md text-gray-300 '}>
                                    Материнская плата
                                </div>
                            </div>
                            <div className={'ml-3 text-lg '}>
                                {item.motherboard}
                            </div>
                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line'}/>
                                <div className={'font-light text-gray-300 '}>
                                    Охлаждение
                                </div>
                            </div>
                            <div className={'ml-3 text-lg '}>
                                {item.cooling}
                            </div>
                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-row space-x-2'}>
                                <div className={'magazin-item-line'}/>
                                <div className={'font-light text-gray-300 '}>
                                    Корпус
                                </div>
                            </div>
                            <div className={'ml-3 text-lg '}>
                                {item.frame}
                            </div>
                        </div>


                    </animated.div>
                    <div className={'grid grid-cols-2 self-center  gap-x-2 pb-5 '}>
                        <button className={'bg-[#00c78d] p-3 rounded-xl text-black font-medium'}>
                            Купить
                        </button>
                        <Link to={`/store/${item.id}`}>
                            <button className={'bg-zinc-800 p-3 rounded-xl text-white'}>
                                Подробнее
                            </button>
                        </Link>
                    </div>

                </div> :
                <div
                    className={'flex flex-col items-center justify-between  relative py-5 transition ease-in-out duration-150  '}>
                    <div className={'absolute w-[60rem] bottom-36 z-0 blur-sm'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 135.92623">
                            <g id="Слой_1" data-name="Слой 1">
                                <path className="fill-[#ac1ac6] "
                                      d="M1534.5,62.06v5.96c-2.79894,4.06-6.66982,5.05-11.50345,5.04q-253.58709-.15-507.18409-.11a105.96734,105.96734,0,0,1-14.78874-.86c-5.01228-.71-8.65488-3.78-11.14614-8.24-4.75423-8.52-9.84592-16.84-14.31231-25.5-3.36469-6.55-8.2281-9.12-15.51329-9.11q-129.03418.18-258.05844.08-9.18588,0-18.36185,0a13.13756,13.13756,0,0,0-12.48606,7.36c-4.84356,8.84-10.0742,17.46-14.81851,26.35-3.50364,6.56-9.042,9.4-16.05917,9.9-3.454.25-6.9378.05-10.41167.05-91.978,0-183.956.26-275.924-.19a122.56354,122.56354,0,0,0-62.42037,16.33c-26.62965,15.02-53.62653,29.41-80.71274,43.6-19.9102,10.42-41.339,14.35-63.78014,12.94-5.76661-.36-11.57293-.23-17.35939-.23-37.3887-.02-74.7774-.09-112.15617.08-4.84356.02-8.69458-1.02-11.50345-5.05V125.57c2.80887-4.03,6.65989-5.06,11.50345-5.05,52.42557.14,104.86106.28,157.28662-.05,15.811-.1,30.43105-5.95,44.525-12.64,27.33434-12.97,54.43048-26.44,81.84423-39.24A126.58137,126.58137,0,0,1,355.88755,56.9c92.95066.25,185.90133.15,278.852.23,6.86833,0,11.46375-3.67,15.2453-8.77,4.82371-6.5,9.58786-13.05,14.21307-19.7,4.15871-5.98,9.84592-8.36,16.98223-8.35q66.72795.105,133.47576.07,74.91636,0,149.84263-.07c7.12638-.01,12.83344,2.34,16.99216,8.32,4.53587,6.51,9.31,12.85,13.9153,19.31,4.4267,6.22,10.04443,9.27,18.01446,9.27q254.793-.21,509.5761-.19C1527.84011,57.02,1531.70106,58.01,1534.5,62.06Z"
                                      transform="translate(0 -10.01041)"/>
                                <path className="fill-white "
                                      d="M3,117.2737c2.817-4.03465,6.68544-5.06239,11.54446-5.04992,52.61691.13491,105.23562.27828,157.85084-.05484,15.86659-.10045,30.53872-5.945,44.69119-12.63775,27.429-12.97128,54.62384-26.43748,82.13064-39.24031a127.57113,127.57113,0,0,1,54.92855-11.69257c93.28543.25031,186.57168.1574,279.85769.231,6.88742.00542,11.50644-3.66852,15.29868-8.76523,4.8402-6.50537,9.624-13.05641,14.26391-19.70434,4.17441-5.98118,9.88589-8.36138,17.04223-8.34923q66.97665.11373,133.95366.07513,75.19332-.001,150.38682-.07488c7.15317-.01051,12.87451,2.34333,17.05372,8.32533,4.54837,6.51008,9.34413,12.848,13.96278,19.31009,4.44028,6.2124,10.078,9.2682,18.07828,9.2618q255.70812-.20463,511.41624-.18744c4.85284-.00286,8.7339.99025,11.54031,5.04553v5.95385c-2.80531,4.06176-6.69051,5.04843-11.54445,5.04555q-254.50441-.151-509.00866-.11745a106.8126,106.8126,0,0,1-14.83978-.85564c-5.02886-.70868-8.6891-3.77723-11.19085-8.24386-4.76737-8.51152-9.88468-16.83968-14.35991-25.49876-3.38271-6.5453-8.26364-9.1196-15.572-9.10916q-129.49308.18486-258.98665.07943c-6.14266,0-12.28532.01707-18.42792-.00158a13.20506,13.20506,0,0,0-12.53538,7.36281c-4.86051,8.83636-10.11066,17.46247-14.87091,26.35024-3.51494,6.56253-9.07425,9.397-16.11051,9.90295-3.46764.24933-6.96811.04683-10.45368.04683-92.30559.00021-184.61242.26183-276.91579-.18664a123.31386,123.31386,0,0,0-62.6431,16.327c-26.72664,15.02185-53.82371,29.40729-81.00893,43.596-19.97355,10.42473-41.48474,14.35006-64.00846,12.94171-5.78885-.362-11.61228-.22807-17.41986-.23071-37.51988-.017-75.04008-.08212-112.55924.08127C9.68335,137.231,5.81576,136.19517,3,132.15835Z"
                                      transform="translate(0 -10.01041)"/>
                                <path className="fill-[#ff70fd] "
                                      d="M0,115.2737c2.828-4.03465,6.71159-5.06239,11.58961-5.04992,52.82272.13491,105.64724.27828,158.46825-.05484,15.92865-.10045,30.65817-5.945,44.866-12.63775,27.53624-12.97128,54.83749-26.43748,82.45187-39.24031a128.49489,128.49489,0,0,1,55.1434-11.69257c93.6503.25031,187.30143.1574,280.95231.231,6.91436.00542,11.55145-3.66852,15.35852-8.76523,4.85913-6.50537,9.66168-13.05641,14.3197-19.70434,4.19073-5.98118,9.92456-8.36138,17.10888-8.34923q67.23862.11373,134.47761.07513,75.48743-.001,150.975-.07488c7.18115-.01051,12.92487,2.34333,17.12042,8.32533,4.56617,6.51008,9.38068,12.848,14.0174,19.31009,4.45764,6.2124,10.11737,9.2682,18.149,9.2618q256.70827-.20463,513.41656-.18744c4.87183-.00286,8.76807.99025,11.58545,5.04553v5.95385c-2.81628,4.06176-6.71667,5.04843-11.5896,5.04555q-255.49987-.151-510.99957-.11745a107.64485,107.64485,0,0,1-14.89783-.85564c-5.04852-.70868-8.72308-3.77723-11.23462-8.24386-4.786-8.51152-9.92334-16.83968-14.41608-25.49876-3.39593-6.5453-8.29595-9.1196-15.63293-9.10916q-129.99957.18486-259.99963.07943c-6.16669,0-12.33338.01707-18.5-.00158-5.67414-.01715-9.80512,2.32968-12.58442,7.36281-4.87951,8.83636-10.1502,17.46247-14.92907,26.35024-3.52869,6.56253-9.10974,9.397-16.17353,9.90295-3.4812.24933-6.99536.04683-10.49456.04683-92.66663.00021-185.33451.26183-277.9989-.18664a124.17342,124.17342,0,0,0-62.88813,16.327c-26.83117,15.02185-54.03422,29.40729-81.32577,43.596-20.05168,10.42473-41.647,14.35006-64.25882,12.94171-5.81149-.362-11.6577-.22807-17.488-.23071-37.66663-.017-75.33359-.08212-112.9995.08127C6.70949,135.231,2.82677,134.19517,0,130.15835Z"
                                      transform="translate(0 -10.01041)"/>
                            </g>
                        </svg>
                    </div>
                    <div
                        className={'transition ease-in-out duration-150 absolute w-[60rem] bottom-36 z-0 ' + (rigthSide ? 'transition ease-in-out duration-150  blur-lg' : '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 135.92623">
                            <g id="Слой_1" data-name="Слой 1">
                                <path className="fill-[#ac1ac6] "
                                      d="M1534.5,62.06v5.96c-2.79894,4.06-6.66982,5.05-11.50345,5.04q-253.58709-.15-507.18409-.11a105.96734,105.96734,0,0,1-14.78874-.86c-5.01228-.71-8.65488-3.78-11.14614-8.24-4.75423-8.52-9.84592-16.84-14.31231-25.5-3.36469-6.55-8.2281-9.12-15.51329-9.11q-129.03418.18-258.05844.08-9.18588,0-18.36185,0a13.13756,13.13756,0,0,0-12.48606,7.36c-4.84356,8.84-10.0742,17.46-14.81851,26.35-3.50364,6.56-9.042,9.4-16.05917,9.9-3.454.25-6.9378.05-10.41167.05-91.978,0-183.956.26-275.924-.19a122.56354,122.56354,0,0,0-62.42037,16.33c-26.62965,15.02-53.62653,29.41-80.71274,43.6-19.9102,10.42-41.339,14.35-63.78014,12.94-5.76661-.36-11.57293-.23-17.35939-.23-37.3887-.02-74.7774-.09-112.15617.08-4.84356.02-8.69458-1.02-11.50345-5.05V125.57c2.80887-4.03,6.65989-5.06,11.50345-5.05,52.42557.14,104.86106.28,157.28662-.05,15.811-.1,30.43105-5.95,44.525-12.64,27.33434-12.97,54.43048-26.44,81.84423-39.24A126.58137,126.58137,0,0,1,355.88755,56.9c92.95066.25,185.90133.15,278.852.23,6.86833,0,11.46375-3.67,15.2453-8.77,4.82371-6.5,9.58786-13.05,14.21307-19.7,4.15871-5.98,9.84592-8.36,16.98223-8.35q66.72795.105,133.47576.07,74.91636,0,149.84263-.07c7.12638-.01,12.83344,2.34,16.99216,8.32,4.53587,6.51,9.31,12.85,13.9153,19.31,4.4267,6.22,10.04443,9.27,18.01446,9.27q254.793-.21,509.5761-.19C1527.84011,57.02,1531.70106,58.01,1534.5,62.06Z"
                                      transform="translate(0 -10.01041)"/>
                                <path className="fill-white "
                                      d="M3,117.2737c2.817-4.03465,6.68544-5.06239,11.54446-5.04992,52.61691.13491,105.23562.27828,157.85084-.05484,15.86659-.10045,30.53872-5.945,44.69119-12.63775,27.429-12.97128,54.62384-26.43748,82.13064-39.24031a127.57113,127.57113,0,0,1,54.92855-11.69257c93.28543.25031,186.57168.1574,279.85769.231,6.88742.00542,11.50644-3.66852,15.29868-8.76523,4.8402-6.50537,9.624-13.05641,14.26391-19.70434,4.17441-5.98118,9.88589-8.36138,17.04223-8.34923q66.97665.11373,133.95366.07513,75.19332-.001,150.38682-.07488c7.15317-.01051,12.87451,2.34333,17.05372,8.32533,4.54837,6.51008,9.34413,12.848,13.96278,19.31009,4.44028,6.2124,10.078,9.2682,18.07828,9.2618q255.70812-.20463,511.41624-.18744c4.85284-.00286,8.7339.99025,11.54031,5.04553v5.95385c-2.80531,4.06176-6.69051,5.04843-11.54445,5.04555q-254.50441-.151-509.00866-.11745a106.8126,106.8126,0,0,1-14.83978-.85564c-5.02886-.70868-8.6891-3.77723-11.19085-8.24386-4.76737-8.51152-9.88468-16.83968-14.35991-25.49876-3.38271-6.5453-8.26364-9.1196-15.572-9.10916q-129.49308.18486-258.98665.07943c-6.14266,0-12.28532.01707-18.42792-.00158a13.20506,13.20506,0,0,0-12.53538,7.36281c-4.86051,8.83636-10.11066,17.46247-14.87091,26.35024-3.51494,6.56253-9.07425,9.397-16.11051,9.90295-3.46764.24933-6.96811.04683-10.45368.04683-92.30559.00021-184.61242.26183-276.91579-.18664a123.31386,123.31386,0,0,0-62.6431,16.327c-26.72664,15.02185-53.82371,29.40729-81.00893,43.596-19.97355,10.42473-41.48474,14.35006-64.00846,12.94171-5.78885-.362-11.61228-.22807-17.41986-.23071-37.51988-.017-75.04008-.08212-112.55924.08127C9.68335,137.231,5.81576,136.19517,3,132.15835Z"
                                      transform="translate(0 -10.01041)"/>
                                <path className="fill-[#ff70fd] "
                                      d="M0,115.2737c2.828-4.03465,6.71159-5.06239,11.58961-5.04992,52.82272.13491,105.64724.27828,158.46825-.05484,15.92865-.10045,30.65817-5.945,44.866-12.63775,27.53624-12.97128,54.83749-26.43748,82.45187-39.24031a128.49489,128.49489,0,0,1,55.1434-11.69257c93.6503.25031,187.30143.1574,280.95231.231,6.91436.00542,11.55145-3.66852,15.35852-8.76523,4.85913-6.50537,9.66168-13.05641,14.3197-19.70434,4.19073-5.98118,9.92456-8.36138,17.10888-8.34923q67.23862.11373,134.47761.07513,75.48743-.001,150.975-.07488c7.18115-.01051,12.92487,2.34333,17.12042,8.32533,4.56617,6.51008,9.38068,12.848,14.0174,19.31009,4.45764,6.2124,10.11737,9.2682,18.149,9.2618q256.70827-.20463,513.41656-.18744c4.87183-.00286,8.76807.99025,11.58545,5.04553v5.95385c-2.81628,4.06176-6.71667,5.04843-11.5896,5.04555q-255.49987-.151-510.99957-.11745a107.64485,107.64485,0,0,1-14.89783-.85564c-5.04852-.70868-8.72308-3.77723-11.23462-8.24386-4.786-8.51152-9.92334-16.83968-14.41608-25.49876-3.39593-6.5453-8.29595-9.1196-15.63293-9.10916q-129.99957.18486-259.99963.07943c-6.16669,0-12.33338.01707-18.5-.00158-5.67414-.01715-9.80512,2.32968-12.58442,7.36281-4.87951,8.83636-10.1502,17.46247-14.92907,26.35024-3.52869,6.56253-9.10974,9.397-16.17353,9.90295-3.4812.24933-6.99536.04683-10.49456.04683-92.66663.00021-185.33451.26183-277.9989-.18664a124.17342,124.17342,0,0,0-62.88813,16.327c-26.83117,15.02185-54.03422,29.40729-81.32577,43.596-20.05168,10.42473-41.647,14.35006-64.25882,12.94171-5.81149-.362-11.6577-.22807-17.488-.23071-37.66663-.017-75.33359-.08212-112.9995.08127C6.70949,135.231,2.82677,134.19517,0,130.15835Z"
                                      transform="translate(0 -10.01041)"/>
                            </g>
                        </svg>
                    </div>
                    <div className={'relative z-0 self-center  h-full flex flex-col justify-center'}>
                        <img className={'xl:w-72 object-contain '} src={`http://localhost:3001/${main?.image}`}
                             alt={'img'}/>
                    </div>
                    <div className={'grid grid-cols-2 self-center  gap-x-2 z-20 '}>
                        <button className={'bg-[#00c78d] p-3 rounded-xl text-black font-medium relative z-40'}>
                            Купить
                        </button>
                        <Link to={`/store/${item.id}`}>
                            <button className={'bg-[#09090A] p-3 rounded-xl text-white'}>
                                Подробнее
                            </button>
                        </Link>
                    </div>
                </div>
        }

    </animated.div>

}


function ListCards({inViewport, computers, type}) {

    const indexRef = useRef(1)
    const [computer, setComputer] = useState([])
    const [height, setHeight] = useState(0)
    const [zIndex, setZindex] = useState(1);

    const switchIndex = (ref) => {
        ref.current.style.zIndex = zIndex;
        setZindex(zIndex);
    };

    useEffect(() => {
        setComputer(computers.filter(x => x.type === type))
    }, [type])


    const [items, setItems] = useState([
        {opacity: 1, y: 0, background: 'rgb(39 ,39, 42)', z: 0, scale: 1, id: 0},
        {opacity: 1, y: 20, background: 'rgb(63, 63, 70)', z: 1, scale: 1, id: 1},
        {opacity: 1, y: 40, background: 'rgb(82, 82, 91)', z: 2, scale: 1, id: 2},
        {opacity: 1, y: 60, background: 'rgb(113, 113, 122)', z: 3, scale: 1, id: 3},
    ].slice(0, computer.length - 1))


    const [loading, setLoading] = useState(false)
    const [end, setEnd] = useState(false)
    const [lastItem, setLastItem] = useState(items.length - 1)
    const [count, setCount] = useState(0)

    const toStart = (i) => ({
        y: i * 20,
        config: config.stiff
    })

    useEffect(() => {
        // setItems(items.slice(0, computer.length - 1))
        // api.start((index)=>({
        //     from: {
        //         y: 0,
        //         opacity: items[index].opacity,
        //         background: items[index].background,
        //         zIndex: items[index].z,
        //         scale: 1,
        //     },
        //     to:{
        //         y: index * 20,
        //         opacity: items[index].opacity,
        //         background: items[index].background,
        //         zIndex: items[index].z,
        //         scale: 1,
        //     },
        // }))
    }, [])


    useEffect(() => {
        if (inViewport === true) {
            api(index => ({
                ...toStart(index),
                config: config.wobbly,
                delay: 200
            }))

        }
    }, [inViewport])


    const [springs, api] = useSprings(items.length, index => ({
        from: {
            y: 0,
            opacity: items[index].opacity,
            background: items[index].background,
            zIndex: items[index].z,
            scale: 1,
        },
        config: config.stiff,

        // delay:index*100
    }))

    const [springBg, apiBg] = useSpring(() => ({from: {width: 0}}))

    // useEffect(() => {
    //     if (indexRef !== 0){
    //         if (indexRef.current.style.zIndex>Math.max(indexes)){
    //             setHeight(50)
    //         }
    //     }
    // }, [api])


    const toEnd = (i) => ({
        opacity: items[i].opacity,
        zIndex: items[i].z,
        y: items[i].y,
        background: items[i].background,
        scale: 1,
        config: config.stiff
    })

    const toDefault = (index) => ({
        to: [
            {
                opacity: 1,
                y: items[index].y,
                background: items[index].background,
                zIndex: items[index].z,
                scale: 1,
                config: config.stiff,
                // delay:200
            },
        ],
        config: {duration: 3000},

        onstart: () => console.log('start')

    })

    function NewItems() {

        if (lastItem === 2) {
            setItems([
                {opacity: 1, y: 0, background: 'linear-gradient(to right, #002f2f, #e02f4b)', z: 0, scale: 1, id: 3},
                {opacity: 1, y: 20, background: 'linear-gradient(to right, #009fff, #ec2f4b)', z: 1, scale: 1, id: 1},
                {opacity: 1, y: 40, background: 'linear-gradient(to left, #007fff, #ec212b)', z: 2, scale: 1, id: 2},
                // {opacity: 1, y: 60, background: 'linear-gradient(to top, #044fff, #e02f4b)', z: 3, scale: 1, id: 4},
            ])
        } else if (lastItem === 1) {
            setItems([
                {opacity: 1, y: 0, background: 'linear-gradient(to left, #007fff, #ec212b)', z: 0, scale: 1, id: 2},
                {opacity: 1, y: 20, background: 'linear-gradient(to right, #002f2f, #e02f4b)', z: 1, scale: 1, id: 3},
                {opacity: 1, y: 40, background: 'linear-gradient(to right, #009fff, #ec2f4b)', z: 2, scale: 1, id: 1},
                // {opacity: 1, y: 60, background: 'linear-gradient(to top, #044fff, #e02f4b)', z: 3, scale: 1, id: 4},
            ])
        }
        // const sortArr = items.sort((a, b) => a.id - b.id)
        // const lastRow = sortArr[lastItem]
        //
        // lastRow.y = 0
        // lastRow.z = 0
        // lastRow.opacity = 1
        //
        // const newItems = [lastRow]
        //
        //
        // const anotherRows = sortArr.filter(x => x.id !== lastItem + 1)
        // for (let i = 1; i < anotherRows.length + 1; i += 1) {
        //     anotherRows[i - 1].z = i
        //     anotherRows[i - 1].y = i * 20
        // }
        //
        // newItems.push(...anotherRows)
        // setItems(newItems)
        // setLastItem(lastItem - 1)
        setItems(lastItem - 1)

    }

    const [indexes, setIndexes] = useState([0, 1, 2, 3])

    useEffect(() => {
        const newIndexes = [].concat(indexes.slice(-1), indexes.slice(0, -1))
        setIndexes(newIndexes)
    }, [])

    function SwitchItems() {
        if (lastItem > 0) {
            const newIndexes = [].concat(indexes.slice(-1), indexes.slice(0, -1))
            setIndexes(newIndexes)
            const newArr = items.map(function (item, i) {
                item.id = indexes[i]
                return item
            })
            setItems(newArr)


            setLastItem((lastItem)=>lastItem - 1)
        } else {
            const newIndexes = [].concat(indexes.slice(-1), indexes.slice(0, -1))
            setIndexes(newIndexes)
            const newArr = items.map(function (item, i) {
                item.id = indexes[i]
                return item
            })
            setItems(newArr)
            setLastItem(items.length - 1)
        }


    }

    console.log(items)

    const bind = useDrag(
        ({down, distance, movement: [mx, my], args: [index], cancel, active}) => {

            if (!down) {
                SwitchItems()
            }

            api.start((i) =>
                down && my < 50 ?
                    {

                        // zIndex: i!== items.length - 1 && my>20?items[i].z+items.length-1:items[i].z,
                        // opacity:i=== items.length - 1 && my>20?0:1,
                        // y: my > 20 && i !== items.length - 1 ? items[i + 1].y : my > 50 && i === items.length - 1 ? items[items.length - 1].y : items[i].y + my,
                        y: items[i].y + my,
                        scale: i === index ? 1.03 : 1,
                        // // y: i === items.length - 1 && my > 5 ? 100 : my > 5 ? items[i + 1].y : items[i].y + my,
                        delay: items[i].y === 0 ? 200 : items[i].y > 20 ? 100 : 0,
                        // background: my>20 && i !== items.length - 1? items[i+1].background: my > 20 && i === items.length - 1 ? items[0].background : items[i].background,
                        config: config.stiff,
                    } : down && my > 50 ? {

                        opacity: i === items.length - 1 ? 0 : 1,
                        zIndex: i !== items.length - 1 ? items[i].z + items.length - 1 : items[i].z,
                    } : {
                        opacity: 1,
                        y: items[i].y,
                        background: items[i].background,
                        zIndex: items[i].z,
                        scale: 1,
                        config: config.stiff,
                        // delay:200
                    },)

            //как только дойдет до отметки в 20 пикселей начинается анимация которую сделаешь и все

        }
        ,
        {
            axis: 'y',
            bounds: {
                top: 0
            }
            ,
            rubberband: true
        }
    )

    if (!computer.length) {
        return <div>loading</div>
    }

    return springs.map(({zIndex, opacity, y, background, scale}, i) =>
        <animated.div key={i} {...bind(i)} style={{zIndex, opacity, background, y, touchAction: 'pan-x', scale}}
                      className={'w-full  absolute shadow-white  rounded-xl  '}>

            <div className={'grid grid-rows-9 relative  '}>
                <animated.div ref={indexRef} style={{height: height}} className={'absolute top-0 bg-black '}/>
                <div className={'row-span-4  rounded-t-xl h-full flex flex flex-col space-y-2 text-white py-6 pl-6 ' +
                    (i === items.length - 1 ? ' bg-black' : '')}>


                        <div className={'flex flex-row space-x-2'}>
                            <div className={'mobile-magazin-item-line self-start '}/>
                            <div className={'flex flex-col space-y-1'}>
                                <div className={'text-xs text-gray-400'}>
                                    Процессор
                                </div>
                                <div className={'text-sm'}>
                                    {computer[items[i].id]?.CPU.split(' ').slice(0, 3).map((item) => item + ' ')}
                                </div>
                            </div>
                        </div>

                    <div className={'flex flex-row space-x-2'}>
                        <div className={'mobile-magazin-item-line self-start '}/>
                        <div className={'flex flex-col space-y-1'}>
                            <div className={'text-xs text-gray-400'}>
                                Видеокарта
                            </div>
                            <div className={'text-sm'}>
                                {computer[items[i].id]?.GPU.split(' ').slice(0, 3).map((item) => item + ' ')}
                            </div>
                        </div>
                    </div>

                    <div className={'flex flex-row space-x-2'}>
                        <div className={'mobile-magazin-item-line self-start '}/>
                        <div className={'flex flex-col space-y-1'}>
                            <div className={'text-xs text-gray-400'}>
                                Оперативная память
                            </div>
                            <div className={'text-sm'}>
                                {computer[items[i].id]?.RAM.split(' ').slice(0, 3).map((item) => item + ' ')}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={'row-span-5 flex flex-row justify-center items-center  overflow-hidden  relative p-5'}>
                    {
                        i === items.length - 1?<div className={'absolute w-[40rem] bottom-5 -left-10 z-0'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 135.92623">
                                <g id="Слой_1" data-name="Слой 1">
                                    <path className="fill-[#ac1ac6] "
                                          d="M1534.5,62.06v5.96c-2.79894,4.06-6.66982,5.05-11.50345,5.04q-253.58709-.15-507.18409-.11a105.96734,105.96734,0,0,1-14.78874-.86c-5.01228-.71-8.65488-3.78-11.14614-8.24-4.75423-8.52-9.84592-16.84-14.31231-25.5-3.36469-6.55-8.2281-9.12-15.51329-9.11q-129.03418.18-258.05844.08-9.18588,0-18.36185,0a13.13756,13.13756,0,0,0-12.48606,7.36c-4.84356,8.84-10.0742,17.46-14.81851,26.35-3.50364,6.56-9.042,9.4-16.05917,9.9-3.454.25-6.9378.05-10.41167.05-91.978,0-183.956.26-275.924-.19a122.56354,122.56354,0,0,0-62.42037,16.33c-26.62965,15.02-53.62653,29.41-80.71274,43.6-19.9102,10.42-41.339,14.35-63.78014,12.94-5.76661-.36-11.57293-.23-17.35939-.23-37.3887-.02-74.7774-.09-112.15617.08-4.84356.02-8.69458-1.02-11.50345-5.05V125.57c2.80887-4.03,6.65989-5.06,11.50345-5.05,52.42557.14,104.86106.28,157.28662-.05,15.811-.1,30.43105-5.95,44.525-12.64,27.33434-12.97,54.43048-26.44,81.84423-39.24A126.58137,126.58137,0,0,1,355.88755,56.9c92.95066.25,185.90133.15,278.852.23,6.86833,0,11.46375-3.67,15.2453-8.77,4.82371-6.5,9.58786-13.05,14.21307-19.7,4.15871-5.98,9.84592-8.36,16.98223-8.35q66.72795.105,133.47576.07,74.91636,0,149.84263-.07c7.12638-.01,12.83344,2.34,16.99216,8.32,4.53587,6.51,9.31,12.85,13.9153,19.31,4.4267,6.22,10.04443,9.27,18.01446,9.27q254.793-.21,509.5761-.19C1527.84011,57.02,1531.70106,58.01,1534.5,62.06Z"
                                          transform="translate(0 -10.01041)"/>
                                    <path className="fill-white "
                                          d="M3,117.2737c2.817-4.03465,6.68544-5.06239,11.54446-5.04992,52.61691.13491,105.23562.27828,157.85084-.05484,15.86659-.10045,30.53872-5.945,44.69119-12.63775,27.429-12.97128,54.62384-26.43748,82.13064-39.24031a127.57113,127.57113,0,0,1,54.92855-11.69257c93.28543.25031,186.57168.1574,279.85769.231,6.88742.00542,11.50644-3.66852,15.29868-8.76523,4.8402-6.50537,9.624-13.05641,14.26391-19.70434,4.17441-5.98118,9.88589-8.36138,17.04223-8.34923q66.97665.11373,133.95366.07513,75.19332-.001,150.38682-.07488c7.15317-.01051,12.87451,2.34333,17.05372,8.32533,4.54837,6.51008,9.34413,12.848,13.96278,19.31009,4.44028,6.2124,10.078,9.2682,18.07828,9.2618q255.70812-.20463,511.41624-.18744c4.85284-.00286,8.7339.99025,11.54031,5.04553v5.95385c-2.80531,4.06176-6.69051,5.04843-11.54445,5.04555q-254.50441-.151-509.00866-.11745a106.8126,106.8126,0,0,1-14.83978-.85564c-5.02886-.70868-8.6891-3.77723-11.19085-8.24386-4.76737-8.51152-9.88468-16.83968-14.35991-25.49876-3.38271-6.5453-8.26364-9.1196-15.572-9.10916q-129.49308.18486-258.98665.07943c-6.14266,0-12.28532.01707-18.42792-.00158a13.20506,13.20506,0,0,0-12.53538,7.36281c-4.86051,8.83636-10.11066,17.46247-14.87091,26.35024-3.51494,6.56253-9.07425,9.397-16.11051,9.90295-3.46764.24933-6.96811.04683-10.45368.04683-92.30559.00021-184.61242.26183-276.91579-.18664a123.31386,123.31386,0,0,0-62.6431,16.327c-26.72664,15.02185-53.82371,29.40729-81.00893,43.596-19.97355,10.42473-41.48474,14.35006-64.00846,12.94171-5.78885-.362-11.61228-.22807-17.41986-.23071-37.51988-.017-75.04008-.08212-112.55924.08127C9.68335,137.231,5.81576,136.19517,3,132.15835Z"
                                          transform="translate(0 -10.01041)"/>
                                    <path className="fill-[#ff70fd] "
                                          d="M0,115.2737c2.828-4.03465,6.71159-5.06239,11.58961-5.04992,52.82272.13491,105.64724.27828,158.46825-.05484,15.92865-.10045,30.65817-5.945,44.866-12.63775,27.53624-12.97128,54.83749-26.43748,82.45187-39.24031a128.49489,128.49489,0,0,1,55.1434-11.69257c93.6503.25031,187.30143.1574,280.95231.231,6.91436.00542,11.55145-3.66852,15.35852-8.76523,4.85913-6.50537,9.66168-13.05641,14.3197-19.70434,4.19073-5.98118,9.92456-8.36138,17.10888-8.34923q67.23862.11373,134.47761.07513,75.48743-.001,150.975-.07488c7.18115-.01051,12.92487,2.34333,17.12042,8.32533,4.56617,6.51008,9.38068,12.848,14.0174,19.31009,4.45764,6.2124,10.11737,9.2682,18.149,9.2618q256.70827-.20463,513.41656-.18744c4.87183-.00286,8.76807.99025,11.58545,5.04553v5.95385c-2.81628,4.06176-6.71667,5.04843-11.5896,5.04555q-255.49987-.151-510.99957-.11745a107.64485,107.64485,0,0,1-14.89783-.85564c-5.04852-.70868-8.72308-3.77723-11.23462-8.24386-4.786-8.51152-9.92334-16.83968-14.41608-25.49876-3.39593-6.5453-8.29595-9.1196-15.63293-9.10916q-129.99957.18486-259.99963.07943c-6.16669,0-12.33338.01707-18.5-.00158-5.67414-.01715-9.80512,2.32968-12.58442,7.36281-4.87951,8.83636-10.1502,17.46247-14.92907,26.35024-3.52869,6.56253-9.10974,9.397-16.17353,9.90295-3.4812.24933-6.99536.04683-10.49456.04683-92.66663.00021-185.33451.26183-277.9989-.18664a124.17342,124.17342,0,0,0-62.88813,16.327c-26.83117,15.02185-54.03422,29.40729-81.32577,43.596-20.05168,10.42473-41.647,14.35006-64.25882,12.94171-5.81149-.362-11.6577-.22807-17.488-.23071-37.66663-.017-75.33359-.08212-112.9995.08127C6.70949,135.231,2.82677,134.19517,0,130.15835Z"
                                          transform="translate(0 -10.01041)"/>
                                </g>
                            </svg>
                        </div>:null
                    }

                    <div className={'flex flex-col space-y-2 ml-5 z-10'}>
                        <button className={'bg-[#00c78d] text-sm py-1.5 px-3 rounded-xl text-black font-medium relative z-40'}>
                            В корзину
                        </button>
                        <Link to={`/store/${computer[items[i].id]?.id}`}>
                            <button className={'bg-[#09090A] text-sm py-1.5 px-3 rounded-xl text-white'}>
                                Подробнее
                            </button>
                        </Link>
                    </div>
                    <img className={' object-scale-down blur-none w-8/12   '}
                         src={`http://localhost:3001/${computer[items[i].id]?.imagePCs[0].image}`}
                         alt={'img'}/>
                </div>


            </div>

        </animated.div>)
    // shadow-[0_3px_10px_0_rgba(100,100,100,0.3)]

}


function ListPC({computers}) {

    const ref = useRef(0);
    // const cardRef = useRef(0);
    const refPosition = useRef(0);
    const [type, setType] = useState('work')
    const [text, setText] = useState('Категория "ИГРОВЫЕ" характеризует компьютеры, которые, благодаря мощности их комплектующих ' +
        'могут с легкостью предложить окунуться в мир требовательных игр с отличной графикой с высоким и стабильным FPS')
    const typeText = {
        game: 'Категория "ИГРОВЫЕ" характеризует компьютеры, которые, благодаря мощности их комплектующих,' +
            'могут с легкостью предложить окунуться в мир требовательных игр с отличной графикой с высоким и\n' +
            '                        стабильным FPS',
        office: 'Категория "ОФИСНЫЕ" характеризует компьютеры, которые, благодаря мощности их комплектующих,' +
            'могут с легкостью предложить окунуться в мир требовательных игр с отличной графикой с высоким и\n' +
            '                        стабильным FPS',
        work: 'Категория "ДЛЯ РАБОТЫ" характеризует компьютеры, которые, благодаря мощности их комплектующих,' +
            'могут с легкостью предложить окунуться в мир требовательных игр с отличной графикой с высоким и\n' +
            '                        стабильным FPS',
        study: 'Категория "ДЛЯ УЧЕБЫ" характеризует компьютеры, которые, благодаря мощности их комплектующих,' +
            'могут с легкостью предложить окунуться в мир требовательных игр с отличной графикой с высоким и\n' +
            '                        стабильным FPS',
    }
    const screenWidth = window.screen.width

    useEffect(() => {
        const entries = Object.entries(typeText);
        entries.forEach(([key, value]) => {
            if (type === key) {
                setText(value)
            }
        })
    }, [type])

    const computersLenght = computers.filter(x => x.type === type).length

    const [position, setPosition] = useState(0)
    const [widthDiv, setWidth] = useState(0);
    useEffect(() => {
        if (ref.current.offsetWidth !== null) {
            setWidth(ref.current.offsetWidth);
        }
    }, [widthDiv])

    const order = useRef(computers.map((_, index) => index))
    // const isInViewport1 = useIsInViewport(refPosition);

    const [inViewport, setInViewport] = useState(false)


    if (screenWidth > 450) {
        return <div className={' mt-8 ' +
            ' grid grid-cols-12  mx-10 pb-14  mt-16'}>
            <div className={'col-span-10 col-start-2 '}>
                <div className={'text-xl  text-4xl text-center text-white font-medium'}>
                    ГОТОВЫЕ СБОРКИ
                </div>
                {/*НАВ*/}
                <div
                    className={'flex flex-row justify-center items-center space-x-2 text-sm font-extralight mt-6 ' +
                        ' mt-10 text-xl font-light space-x-10'}>
                    <button onClick={() => {
                        setType('game')
                    }}
                            className={'group  flex flex-col text-white ' + (type === 'game' ? 'font-medium text-normal text-2xl' : '')}>
                        <div
                            className={'mb-1 xl:mb-1.5 ' + (type === 'game' ? 'mobile-listPCNav-green-line xl:listPCNav-green-line visible' :
                                'listPCNav-gray-line invisible group-hover:visible ')}/>
                        <div>ИГРОВЫЕ</div>
                    </button>
                    <button onClick={() => {
                        setType('office')
                    }}
                            className={'group  flex flex-col text-white ' + (type === 'office' ? 'font-medium text-2xl' : '')}>
                        <div
                            className={'mb-1 xl:mb-1.5 ' + (type === 'office' ? ' listPCNav-green-line visible' :
                                'listPCNav-gray-line invisible group-hover:visible ')}/>
                        <div>ОФИСНЫЕ</div>
                    </button>
                    <button onClick={() => {
                        setType('work')
                    }}
                            className={'group  flex flex-col text-white ' + (type === 'work' ? 'font-medium text-normal xl:text-2xl' : '')}>
                        <div
                            className={'mb-1 xl:mb-1.5 ' + (type === 'work' ? 'listPCNav-green-line visible' :
                                'listPCNav-gray-line invisible group-hover:visible ')}/>
                        <div>ДЛЯ РАБОТЫ</div>
                    </button>
                    <button onClick={() => {
                        setType('study')
                    }}
                            className={'group  flex flex-col text-white ' + (type === 'study' ? 'font-medium text-2xl' : '')}>
                        <div
                            className={'mb-1 xl:mb-1.5 ' + (type === 'study' ? 'listPCNav-green-line visible' :
                                'listPCNav-gray-line invisible group-hover:visible ')}/>
                        <div>ДЛЯ УЧЕБЫ</div>
                    </button>
                </div>
            </div>
            <div className={'mt-6 xl:col-span-12  xl:mt-16 '}>
                <div
                    className={'flex flex-row justify-around items-stretch mx-8 flex-wrap text-white  -space-x-24  mx-0'}>
                    <div className={'flex flex-col basis-5/12 space-y-10  '}>
                        <div className={'text-xl text-start '}>
                            {text}
                        </div>
                        {computers.filter(x => x.type === type).map((computer, id) => {
                            if (id % 2 === 1) return <ItemPC key={id.toString()} item={computer}/>
                        })}
                    </div>
                    <div className={'flex flex-col space-y-10 basis-5/12 '}>

                        {computers.filter(x => x.type === type).map((computer, id) => {
                            if (id % 2 === 0) return <ItemPC key={id.toString()} item={computer} id={id}/>
                        })}
                    </div>

                </div>
            </div>
            <div className={'col-span-12 mt-10'}>
                <div className={'flex flex-row justify-center'}>
                    <Link to={'/store'}>
                        <div
                            className={'text-black py-3 px-5 rounded-2xl bg-[#00c78d] font-medium text-xl'}>Показать
                            еще
                        </div>

                    </Link>
                </div>
            </div>
        </div>
    } else {
        return <div ref={refPosition} onTouchStart={() => {
            setInViewport(true)
        }} className={' pt-8 mx-6 '}>
            <div className={'text-xl font-medium text-white uppercase'}>
                Сборки {type === 'work' ? <span>для работы</span> : type === 'study' ? <span>для учебы</span> :
                type === 'game' ? <span>игровые</span> : <span>офисные</span>}
            </div>
            <div className={'text-gray-400 text-sm'}>
                Выберите то что подходит именно вам
            </div>
            <div className={'flex flex-row mt-6 space-x-4'}>
                <div className={'flex flex-col space-y-2'}>
                    <button onClick={() => {
                        setType('game')
                    }}
                            className={'rounded-xl w-14 h-14 flex flex-row justify-center items-center ' +
                                (type === 'game'
                                    ? 'transition duration-300 ease-in-out scale-105 bg-[#00c78d] shadow-[0_3px_20px_0_rgba(0,0,0,0.8)] '
                                    : ' bg-zinc-700')}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className={"w-9 h-9  " + (type === 'game' ? "fill-black " : " fill-white")}
                             viewBox="0 0 16 16">
                            <path
                                d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                            <path
                                d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                        </svg>
                    </button>
                    <button onClick={() => {
                        setType('work')
                    }}
                            className={'rounded-xl w-14 h-14 flex flex-row justify-center items-center ' +
                                (type === 'work'
                                    ? ' transition duration-300 ease-in-out scale-105 bg-[#00c78d] shadow-[0_3px_20px_0_rgba(0,0,0,0.8)] '
                                    : ' bg-zinc-700')}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className={"w-9 h-9  " + (type === 'work' ? "fill-black " : " fill-white")}
                             viewBox="0 0 16 16">
                            <path
                                d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                            <path
                                d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
                        </svg>
                    </button>
                    <button onClick={() => {
                        setType('study')
                    }}
                            className={'rounded-xl w-14 h-14 flex flex-row justify-center items-center ' +
                                (type === 'study'
                                    ? ' transition duration-300 ease-in-out scale-105 bg-[#00c78d] shadow-[0_3px_20px_0_rgba(0,0,0,0.8)] '
                                    : ' bg-zinc-700')}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className={"w-9 h-9  " + (type === 'study' ? "fill-black " : " fill-white")}
                             viewBox="0 0 16 16">
                            <path
                                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                            <path
                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path
                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                        </svg>
                    </button>
                    <button onClick={() => {
                        setType('office')
                    }}
                            className={'rounded-xl w-14 h-14 flex flex-row justify-center items-center ' +
                                (type === 'office'
                                    ? ' transition duration-300 ease-in-out scale-105 bg-[#00c78d] shadow-[0_3px_20px_0_rgba(0,0,0,0.8)] '
                                    : ' bg-zinc-700')}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className={"w-9 h-9 " + (type === "office" ? "fill-black  " : "fill-white ")}
                             viewBox="0 0 16 16">
                            <path
                                d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
                            <path
                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                    </button>
                </div>
                <div className={'w-full h-72 relative'}>
                    <ListCards inViewport={inViewport} computers={computers} type={type}/>
                </div>


                {/*{*/}
                {/*    computers.filter(x=>x.type===type).map((item, key)=>{*/}

                {/*        space = space+key*2*/}
                {/*        return <animated.div {...bind()} style={{ springs }} className='bg-red-200 h-44 w-full'>*/}
                {/*            {item.name}*/}
                {/*        </animated.div>*/}
                {/*    })*/}
                {/*}*/}
                {/*<Slider computers={computers} type={type}/>*/}
                {/*</div>*/}
            </div>


        </div>
    }


}

export default ListPC