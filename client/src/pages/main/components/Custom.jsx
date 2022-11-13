import React, {useState, useEffect, useMemo, useRef, useLayoutEffect} from "react";
import {Box, Slider} from "@mui/material";
import {HexColorPicker} from "react-colorful";
import {useDispatch, useSelector} from "react-redux";
import reactCSS from 'reactcss';
import {handleSlide} from "../../../redux/features/main/MainSlice";
import {TwitterPicker} from "react-color";
import {animated, config, easings, useSpring} from "@react-spring/web";


function ItemCases({item}) {

    return <div
        className={' relative z-10 bg-zinc-800  shadow-black rounded-xl  transition duration-300 ease-in-out  '}>
        <img className={'w-11/12 object-contain'} src={`http://localhost:3001/${item.image}`} alt={'img'}/>
    </div>
}

function valuetext(value) {
    return `${value}`;
}

const minDistance = 1000;

function MinimumDistanceSlider() {

    const dispatch = useDispatch()
    const [value1, setValue1] = React.useState([10000, 200000]);

    useEffect(() => {
        dispatch(handleSlide(value1))
    }, [value1])


    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };


    return (
        <div className={''}>
            <Slider
                value={value1}
                onChange={handleChange1}
                step={1000}
                min={10000}
                max={200000}
                valueLabelDisplay="off"
                // aria-label="Small"
                sx={{
                    color: '#00c78d',
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: '16px',
                        height: '16px',

                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: 'none',
                        },
                        '&.Mui-active': {
                            boxShadow: 'none',
                        },

                    },

                }}
                // getAriaValueText={valuetext}
                //disableSwap='true'
            />

        </div>

    );
}

function Custom({cases, computers}) {

    const [type, setType] = useState('')
    const [subType, setSubType] = useState('')
    const [subSubType, setSubSubType] = useState('')
    const [custom, setCustom] = useState('characteristics')
    const [bounce1, setBounce1] = useState(false)
    const [bounce2, setBounce2] = useState(false)
    const [result, setResult] = useState(false)
    const [height, setHeight] = useState(0);
    const [color, setColor] = useState("#000");
    const [colorLight, setColorLight] = useState('');
    const [main, setMain] = useState(null)
    const refHeight = useRef(0);
    // const {cases, computers} = useSelector((state) => state.main)
    const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#FF6900', '#FCB900', '#fff', '#000']
    const colorsLight = ['#e63946', '#1d3557', '#fff']

    useLayoutEffect(() => {
        if (refHeight.current) {
            setHeight(refHeight.current.offsetHeight)
        }
    }, [refHeight.current, cases])

    useEffect(() => {
        if (cases) {
            setMain(cases[6])
        }
    }, [cases])

    useEffect(() => {
        setSubType('')
        setSubSubType('')
        if (type === '') {
            setBounce1(false)
        } else {
            setBounce1(true)
        }
    }, [type])

    useEffect(() => {
        setSubSubType('')
        if (subType === '' || subType === 'office' || subType === 'school' || type === 'game') {
            setBounce2(false)
        } else {
            setBounce2(true)
        }
    }, [type, subType])

    useEffect(() => {
        if (color === '') {
            setColor("#00c78d")
        }
    }, [color])

    const [style, api] = useSpring(() => ({from: {y: result ? -500 : 0}, delay: 2000}))
    const [stylePunct, apiPunct] = useSpring(() => ({from: {x: result ? -200 : 0, opacity:result?0:0}, delay: 2600}))

    useEffect(() => {
        apiPunct({
            to: [
                // {y: result?-200:0},
                {x: result ? 0 : -200, opacity:result?1:0}
            ],
            config: {
                duration: 200,
                mass: 1,
                tension: 180,
                // easing: easings.easeInOutBack,
                friction: 12,
                clamp: false,
                precision: 0.05,
                velocity: 1,
            },
            delay: 2600
        })
    }, [result])

    useEffect(() => {
        api({
            to: [
                // {y: result?-200:0},
                {y: result ? 0 : -500}
            ],
            config: {
                duration: 700,
                mass: 1.3,
                tension: 210,
                easing: easings.easeInOutBack,
                friction: 20,
                clamp: false,
                precision: 0.05,
                velocity: 1,
            },
            delay: 2000
        })
    }, [result])


    return <div className={' mx-10 pb-14 mt-10 snap-center'}>
        <div className={'text-4xl text-center text-white font-medium'}>
            КАСТОМИЗАЦИЯ
            {/*<button onClick={() => setResult(!result)}>ddd</button>*/}
        </div>
        <div className={'mt-10 flex flex-row space-x-8 items-center  '}>
            <div
                className={'grow shadow-[0_3px_20px_0_rgba(0,0,0,0.4)] flex flex-col bg-black rounded-2xl text-white py-6 relative z-10 overflow-hidden '
                    + (result ? ' animate-result' : '')}>
                {
                    result ? <div
                        className={'absolute  w-full h-full bg-black z-10 flex flex-row justify-center'}>
                        <div className={' w-full h-full '}>
                            <div className={'w-screen absolute bottom-1/3 -right-1/2 z-0 blur-md animate-pulse'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 135.92623">
                                    <g id="Слой_1" data-name="Слой 1">
                                        <path className="fill-[#ac1ac6] relative z-0 "
                                              d="M1534.5,62.06v5.96c-2.79894,4.06-6.66982,5.05-11.50345,5.04q-253.58709-.15-507.18409-.11a105.96734,105.96734,0,0,1-14.78874-.86c-5.01228-.71-8.65488-3.78-11.14614-8.24-4.75423-8.52-9.84592-16.84-14.31231-25.5-3.36469-6.55-8.2281-9.12-15.51329-9.11q-129.03418.18-258.05844.08-9.18588,0-18.36185,0a13.13756,13.13756,0,0,0-12.48606,7.36c-4.84356,8.84-10.0742,17.46-14.81851,26.35-3.50364,6.56-9.042,9.4-16.05917,9.9-3.454.25-6.9378.05-10.41167.05-91.978,0-183.956.26-275.924-.19a122.56354,122.56354,0,0,0-62.42037,16.33c-26.62965,15.02-53.62653,29.41-80.71274,43.6-19.9102,10.42-41.339,14.35-63.78014,12.94-5.76661-.36-11.57293-.23-17.35939-.23-37.3887-.02-74.7774-.09-112.15617.08-4.84356.02-8.69458-1.02-11.50345-5.05V125.57c2.80887-4.03,6.65989-5.06,11.50345-5.05,52.42557.14,104.86106.28,157.28662-.05,15.811-.1,30.43105-5.95,44.525-12.64,27.33434-12.97,54.43048-26.44,81.84423-39.24A126.58137,126.58137,0,0,1,355.88755,56.9c92.95066.25,185.90133.15,278.852.23,6.86833,0,11.46375-3.67,15.2453-8.77,4.82371-6.5,9.58786-13.05,14.21307-19.7,4.15871-5.98,9.84592-8.36,16.98223-8.35q66.72795.105,133.47576.07,74.91636,0,149.84263-.07c7.12638-.01,12.83344,2.34,16.99216,8.32,4.53587,6.51,9.31,12.85,13.9153,19.31,4.4267,6.22,10.04443,9.27,18.01446,9.27q254.793-.21,509.5761-.19C1527.84011,57.02,1531.70106,58.01,1534.5,62.06Z"
                                              transform="translate(0 -10.01041)"/>
                                        <path className="fill-white  relative z-0"
                                              d="M3,117.2737c2.817-4.03465,6.68544-5.06239,11.54446-5.04992,52.61691.13491,105.23562.27828,157.85084-.05484,15.86659-.10045,30.53872-5.945,44.69119-12.63775,27.429-12.97128,54.62384-26.43748,82.13064-39.24031a127.57113,127.57113,0,0,1,54.92855-11.69257c93.28543.25031,186.57168.1574,279.85769.231,6.88742.00542,11.50644-3.66852,15.29868-8.76523,4.8402-6.50537,9.624-13.05641,14.26391-19.70434,4.17441-5.98118,9.88589-8.36138,17.04223-8.34923q66.97665.11373,133.95366.07513,75.19332-.001,150.38682-.07488c7.15317-.01051,12.87451,2.34333,17.05372,8.32533,4.54837,6.51008,9.34413,12.848,13.96278,19.31009,4.44028,6.2124,10.078,9.2682,18.07828,9.2618q255.70812-.20463,511.41624-.18744c4.85284-.00286,8.7339.99025,11.54031,5.04553v5.95385c-2.80531,4.06176-6.69051,5.04843-11.54445,5.04555q-254.50441-.151-509.00866-.11745a106.8126,106.8126,0,0,1-14.83978-.85564c-5.02886-.70868-8.6891-3.77723-11.19085-8.24386-4.76737-8.51152-9.88468-16.83968-14.35991-25.49876-3.38271-6.5453-8.26364-9.1196-15.572-9.10916q-129.49308.18486-258.98665.07943c-6.14266,0-12.28532.01707-18.42792-.00158a13.20506,13.20506,0,0,0-12.53538,7.36281c-4.86051,8.83636-10.11066,17.46247-14.87091,26.35024-3.51494,6.56253-9.07425,9.397-16.11051,9.90295-3.46764.24933-6.96811.04683-10.45368.04683-92.30559.00021-184.61242.26183-276.91579-.18664a123.31386,123.31386,0,0,0-62.6431,16.327c-26.72664,15.02185-53.82371,29.40729-81.00893,43.596-19.97355,10.42473-41.48474,14.35006-64.00846,12.94171-5.78885-.362-11.61228-.22807-17.41986-.23071-37.51988-.017-75.04008-.08212-112.55924.08127C9.68335,137.231,5.81576,136.19517,3,132.15835Z"
                                              transform="translate(0 -10.01041)"/>
                                        <path className="fill-[#ff70fd]  relative z-0"
                                              d="M0,115.2737c2.828-4.03465,6.71159-5.06239,11.58961-5.04992,52.82272.13491,105.64724.27828,158.46825-.05484,15.92865-.10045,30.65817-5.945,44.866-12.63775,27.53624-12.97128,54.83749-26.43748,82.45187-39.24031a128.49489,128.49489,0,0,1,55.1434-11.69257c93.6503.25031,187.30143.1574,280.95231.231,6.91436.00542,11.55145-3.66852,15.35852-8.76523,4.85913-6.50537,9.66168-13.05641,14.3197-19.70434,4.19073-5.98118,9.92456-8.36138,17.10888-8.34923q67.23862.11373,134.47761.07513,75.48743-.001,150.975-.07488c7.18115-.01051,12.92487,2.34333,17.12042,8.32533,4.56617,6.51008,9.38068,12.848,14.0174,19.31009,4.45764,6.2124,10.11737,9.2682,18.149,9.2618q256.70827-.20463,513.41656-.18744c4.87183-.00286,8.76807.99025,11.58545,5.04553v5.95385c-2.81628,4.06176-6.71667,5.04843-11.5896,5.04555q-255.49987-.151-510.99957-.11745a107.64485,107.64485,0,0,1-14.89783-.85564c-5.04852-.70868-8.72308-3.77723-11.23462-8.24386-4.786-8.51152-9.92334-16.83968-14.41608-25.49876-3.39593-6.5453-8.29595-9.1196-15.63293-9.10916q-129.99957.18486-259.99963.07943c-6.16669,0-12.33338.01707-18.5-.00158-5.67414-.01715-9.80512,2.32968-12.58442,7.36281-4.87951,8.83636-10.1502,17.46247-14.92907,26.35024-3.52869,6.56253-9.10974,9.397-16.17353,9.90295-3.4812.24933-6.99536.04683-10.49456.04683-92.66663.00021-185.33451.26183-277.9989-.18664a124.17342,124.17342,0,0,0-62.88813,16.327c-26.83117,15.02185-54.03422,29.40729-81.32577,43.596-20.05168,10.42473-41.647,14.35006-64.25882,12.94171-5.81149-.362-11.6577-.22807-17.488-.23071-37.66663-.017-75.33359-.08212-112.9995.08127C6.70949,135.231,2.82677,134.19517,0,130.15835Z"
                                              transform="translate(0 -10.01041)"/>
                                    </g>
                                </svg>
                            </div>
                            <div className={'w-screen absolute bottom-1/3 -right-1/2 z-0 '}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 135.92623">
                                    <g id="Слой_1" data-name="Слой 1">
                                        <path className="fill-[#ac1ac6] relative z-0 "
                                              d="M1534.5,62.06v5.96c-2.79894,4.06-6.66982,5.05-11.50345,5.04q-253.58709-.15-507.18409-.11a105.96734,105.96734,0,0,1-14.78874-.86c-5.01228-.71-8.65488-3.78-11.14614-8.24-4.75423-8.52-9.84592-16.84-14.31231-25.5-3.36469-6.55-8.2281-9.12-15.51329-9.11q-129.03418.18-258.05844.08-9.18588,0-18.36185,0a13.13756,13.13756,0,0,0-12.48606,7.36c-4.84356,8.84-10.0742,17.46-14.81851,26.35-3.50364,6.56-9.042,9.4-16.05917,9.9-3.454.25-6.9378.05-10.41167.05-91.978,0-183.956.26-275.924-.19a122.56354,122.56354,0,0,0-62.42037,16.33c-26.62965,15.02-53.62653,29.41-80.71274,43.6-19.9102,10.42-41.339,14.35-63.78014,12.94-5.76661-.36-11.57293-.23-17.35939-.23-37.3887-.02-74.7774-.09-112.15617.08-4.84356.02-8.69458-1.02-11.50345-5.05V125.57c2.80887-4.03,6.65989-5.06,11.50345-5.05,52.42557.14,104.86106.28,157.28662-.05,15.811-.1,30.43105-5.95,44.525-12.64,27.33434-12.97,54.43048-26.44,81.84423-39.24A126.58137,126.58137,0,0,1,355.88755,56.9c92.95066.25,185.90133.15,278.852.23,6.86833,0,11.46375-3.67,15.2453-8.77,4.82371-6.5,9.58786-13.05,14.21307-19.7,4.15871-5.98,9.84592-8.36,16.98223-8.35q66.72795.105,133.47576.07,74.91636,0,149.84263-.07c7.12638-.01,12.83344,2.34,16.99216,8.32,4.53587,6.51,9.31,12.85,13.9153,19.31,4.4267,6.22,10.04443,9.27,18.01446,9.27q254.793-.21,509.5761-.19C1527.84011,57.02,1531.70106,58.01,1534.5,62.06Z"
                                              transform="translate(0 -10.01041)"/>
                                        <path className="fill-white  relative z-0"
                                              d="M3,117.2737c2.817-4.03465,6.68544-5.06239,11.54446-5.04992,52.61691.13491,105.23562.27828,157.85084-.05484,15.86659-.10045,30.53872-5.945,44.69119-12.63775,27.429-12.97128,54.62384-26.43748,82.13064-39.24031a127.57113,127.57113,0,0,1,54.92855-11.69257c93.28543.25031,186.57168.1574,279.85769.231,6.88742.00542,11.50644-3.66852,15.29868-8.76523,4.8402-6.50537,9.624-13.05641,14.26391-19.70434,4.17441-5.98118,9.88589-8.36138,17.04223-8.34923q66.97665.11373,133.95366.07513,75.19332-.001,150.38682-.07488c7.15317-.01051,12.87451,2.34333,17.05372,8.32533,4.54837,6.51008,9.34413,12.848,13.96278,19.31009,4.44028,6.2124,10.078,9.2682,18.07828,9.2618q255.70812-.20463,511.41624-.18744c4.85284-.00286,8.7339.99025,11.54031,5.04553v5.95385c-2.80531,4.06176-6.69051,5.04843-11.54445,5.04555q-254.50441-.151-509.00866-.11745a106.8126,106.8126,0,0,1-14.83978-.85564c-5.02886-.70868-8.6891-3.77723-11.19085-8.24386-4.76737-8.51152-9.88468-16.83968-14.35991-25.49876-3.38271-6.5453-8.26364-9.1196-15.572-9.10916q-129.49308.18486-258.98665.07943c-6.14266,0-12.28532.01707-18.42792-.00158a13.20506,13.20506,0,0,0-12.53538,7.36281c-4.86051,8.83636-10.11066,17.46247-14.87091,26.35024-3.51494,6.56253-9.07425,9.397-16.11051,9.90295-3.46764.24933-6.96811.04683-10.45368.04683-92.30559.00021-184.61242.26183-276.91579-.18664a123.31386,123.31386,0,0,0-62.6431,16.327c-26.72664,15.02185-53.82371,29.40729-81.00893,43.596-19.97355,10.42473-41.48474,14.35006-64.00846,12.94171-5.78885-.362-11.61228-.22807-17.41986-.23071-37.51988-.017-75.04008-.08212-112.55924.08127C9.68335,137.231,5.81576,136.19517,3,132.15835Z"
                                              transform="translate(0 -10.01041)"/>
                                        <path className="fill-[#ff70fd]  relative z-0"
                                              d="M0,115.2737c2.828-4.03465,6.71159-5.06239,11.58961-5.04992,52.82272.13491,105.64724.27828,158.46825-.05484,15.92865-.10045,30.65817-5.945,44.866-12.63775,27.53624-12.97128,54.83749-26.43748,82.45187-39.24031a128.49489,128.49489,0,0,1,55.1434-11.69257c93.6503.25031,187.30143.1574,280.95231.231,6.91436.00542,11.55145-3.66852,15.35852-8.76523,4.85913-6.50537,9.66168-13.05641,14.3197-19.70434,4.19073-5.98118,9.92456-8.36138,17.10888-8.34923q67.23862.11373,134.47761.07513,75.48743-.001,150.975-.07488c7.18115-.01051,12.92487,2.34333,17.12042,8.32533,4.56617,6.51008,9.38068,12.848,14.0174,19.31009,4.45764,6.2124,10.11737,9.2682,18.149,9.2618q256.70827-.20463,513.41656-.18744c4.87183-.00286,8.76807.99025,11.58545,5.04553v5.95385c-2.81628,4.06176-6.71667,5.04843-11.5896,5.04555q-255.49987-.151-510.99957-.11745a107.64485,107.64485,0,0,1-14.89783-.85564c-5.04852-.70868-8.72308-3.77723-11.23462-8.24386-4.786-8.51152-9.92334-16.83968-14.41608-25.49876-3.39593-6.5453-8.29595-9.1196-15.63293-9.10916q-129.99957.18486-259.99963.07943c-6.16669,0-12.33338.01707-18.5-.00158-5.67414-.01715-9.80512,2.32968-12.58442,7.36281-4.87951,8.83636-10.1502,17.46247-14.92907,26.35024-3.52869,6.56253-9.10974,9.397-16.17353,9.90295-3.4812.24933-6.99536.04683-10.49456.04683-92.66663.00021-185.33451.26183-277.9989-.18664a124.17342,124.17342,0,0,0-62.88813,16.327c-26.83117,15.02185-54.03422,29.40729-81.32577,43.596-20.05168,10.42473-41.647,14.35006-64.25882,12.94171-5.81149-.362-11.6577-.22807-17.488-.23071-37.66663-.017-75.33359-.08212-112.9995.08127C6.70949,135.231,2.82677,134.19517,0,130.15835Z"
                                              transform="translate(0 -10.01041)"/>
                                    </g>
                                </svg>
                            </div>
                            <div className={'relative flex flex-row justify-center space-x-16 z-20 '}>
                                <animated.div style={style} className={'flex flex-col transform -translate-y-[500px] '}>
                                    <img className={'w-96 relative z-20  '}
                                         src={`http://localhost:3001/${computers[0]?.imagePCs[0].image}`} alt={'img'}/>
                                    {/*<div className={'relative z-10 w-64 h-6 skew-y-[3deg] bg-purple-300 rounded- blur-[8px] transform ' +*/}
                                    {/*    '-translate-y-14 translate-x-12'}>*/}

                                    {/*</div>*/}
                                </animated.div>
                                <div className={' w-72 flex flex-col items-center space-y-12 mt-5'}>
                                    <animated.div style={stylePunct}>
                                        <div className={'flex flex-col'}>
                                            <div className={'flex flex-row space-x-2'}>
                                                <div className={'magazin-item-line '}/>
                                                <div className={'font-light text-md text-gray-300 '}>
                                                    Процессор
                                                </div>
                                            </div>
                                            <div className={'ml-3 text-lg '}>
                                                {computers[0].CPU}
                                            </div>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <div className={'flex flex-row space-x-2'}>
                                                <div className={'magazin-item-line'}/>
                                                <div className={'font-light text-gray-300 '}>
                                                    Оперативная память
                                                </div>
                                            </div>
                                            <div className={'ml-3 text-lg '}>
                                                {computers[0].RAM}
                                            </div>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <div className={'flex flex-row space-x-2'}>
                                                <div className={'magazin-item-line'}/>
                                                <div className={'font-light text-gray-300 '}>
                                                    Видеокарта
                                                </div>
                                            </div>
                                            <div className={'ml-3 text-lg '}>
                                                {computers[0].GPU}
                                            </div>
                                        </div>
                                    </animated.div>
                                    <button className={' px-4 py-3 text-3xl text-white'}>
                                        Подтвердить
                                    </button>
                                </div>
                            </div>
                            <div className={'flex flex-col space-y-4 text-white items-center'}>
                                <div className={' text-2xl font-medium flex flex-row justify-center'}>
                                    Лучший выбор по выбранным вами параметрам
                                </div>
                                <div className={'font-light text-md text-gray-300'}>
                                    Не понравился выбор? <button onClick={()=>setResult(!result)} className={'border-b-2 border-gray-400'}> Отменить </button>
                                </div>
                            </div>
                        </div>

                    </div> : null
                }
                <div className={'flex flex-row justify-center space-x-8  text-xl pb-6 text-gray-400 '}>
                    <button onClick={() => {
                        setCustom('characteristics')
                    }} className={custom === 'characteristics' ? 'font-medium text-white ' : ''}>
                        ХАРАКТЕРИСТИКИ
                    </button>
                    <button onClick={() => {
                        setCustom('result')
                    }} className={custom === 'result' ? 'font-medium text-white ' : ''}>
                        РЕЗУЛЬТАТ
                    </button>
                    <button onClick={() => {
                        setCustom('personal')
                    }} className={custom === 'personal' ? 'font-medium text-white ' : ''}>
                        ВНЕШНИЙ ВИД
                    </button>

                </div>
                {
                    custom === 'characteristics' ?
                        <div ref={refHeight} className={'flex flex-col text-gray-400 text-xl space-y-4 '}>
                            <div className={'grid grid-cols-8 justify-items-stretch w-full text-black ml-14 pt-2 '}>
                                <div className={'grid grid-rows-3 gap-y-5 justify-items-center place-items-center'}>
                                    <button onClick={() => {
                                        setType('game')
                                    }}
                                            className={'justify-self-end flex flex-col space-y-4 items-center py-5 px-5 w-full  rounded-2xl text-md ' +
                                                (type === 'game' ? ' bg-[#00c78d] font-medium  row-start-2  transition duration-500 ease-in-out  scale-110 ' :
                                                    ' bg-zinc-800 text-gray-400 font-normal row-start-1 ')}>
                                        <div>
                                            Игры
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className={"w-10 h-10 " + (type === 'game' ? " " : "fill-gray-400 ")}
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
                                            className={'justify-self-center flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl   ' +
                                                (type === 'work' ? ' bg-[#00c78d] font-medium transition duration-500 ease-in-out  scale-110 row-start-2 ' : type === 'study' ? ' bg-zinc-800 text-gray-400 font-normal row-start-3' :
                                                    ' bg-zinc-800 text-gray-400 font-normal ')}>
                                        <div>
                                            Работа
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className={"w-10 h-10 " + (type === "work" ? "  " : " fill-gray-400 ")}
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
                                            className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full rounded-2xl  ' +
                                                (type === 'study' ?
                                                    ' bg-[#00c78d] font-medium transition duration-500 ease-in-out  scale-110 row-start-2 ' :
                                                    ' bg-zinc-800 text-gray-400 font-normal row-start-3    ')}>
                                        <div>
                                            Учеба
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className={"w-10 h-10 " + (type === "study" ? "  " : " fill-gray-400 ")}
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                            <path
                                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                            <path
                                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className={'grid grid-rows-3 gap-y-5'}>
                                    <div className={'place-self-center row-start-2 '}>

                                        <div className={'self-center pt-2 ' + (bounce1 ? 'visible' : 'invisible')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 className="w-8 h-8 fill-[#00c78d] animate-bounceNew "
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {
                                    type === 'work' ?
                                        <div
                                            className={'col-span-2 grid grid-rows-3  gap-y-5  text-gray-400 font-normal'}>

                                            <button onClick={() => {
                                                setSubType('it')
                                            }}
                                                    className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'it' ?
                                                        ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 row-start-2 ' :
                                                        'bg-zinc-800 rounded-2xl')}>
                                                <div>
                                                    Кодинг
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subType === "it" ? "fill-black  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">

                                                    <path
                                                        d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
                                                    <path
                                                        d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => {
                                                setSubType('design')
                                            }}
                                                    className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'design' ?
                                                        ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 ' : subType === 'office' ?
                                                            ' bg-zinc-800 rounded-2xl row-start-3' : ' bg-zinc-800 rounded-2xl row-start-1')}>

                                                <div>
                                                    Дизайн
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subType === "design" ? "fill-black  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => {
                                                setSubType('office')
                                            }}
                                                    className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'office' ?
                                                        ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 row-start-2' : ' bg-zinc-800 rounded-2xl')}>


                                                <div>
                                                    Для офиса
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subType === "office" ? "fill-black  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
                                                    <path
                                                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                                </svg>
                                            </button>

                                        </div>
                                        : type === 'game' ?
                                            <div className={'grid grid-rows-3  gap-y-5  text-gray-400 font-medium '}>
                                                <button onClick={() => {
                                                    setSubType('onlineGame')
                                                }}
                                                        className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'onlineGame' ?
                                                            ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 ' : ' bg-zinc-800 rounded-2xl')}>
                                                    <div>
                                                        Онлайн
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={"w-10 h-10 " + (subType === "onlineGame" ? "fill-black  " : " fill-gray-400 ")}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"/>
                                                        <path
                                                            d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => {
                                                    setSubType('offlineGame')
                                                }}
                                                        className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'offlineGame' ?
                                                            ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 ' : ' bg-zinc-800 rounded-2xl')}>
                                                    <div>
                                                        Оффлайн
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={"w-10 h-10 " + (subType === "offlineGame" ? "fill-black  " : " fill-gray-400 ")}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"/>
                                                    </svg>
                                                </button>
                                            </div> :
                                            type === 'study' ?
                                                <div
                                                    className={'col-span-2 grid grid-rows-3  gap-y-5  text-gray-400 font-normal'}>

                                                    <button onClick={() => {
                                                        setSubType('it')
                                                    }}
                                                            className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + ( subType === 'it' ?
                                                                ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 row-start-2 ' :
                                                                ' bg-zinc-800 rounded-2xl')}>
                                                        <div>
                                                            Кодинг
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className={"w-10 h-10 " + (subType === "it" ? "fill-black  " : " fill-gray-400 ")}
                                                             viewBox="0 0 16 16">

                                                            <path
                                                                d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
                                                            <path
                                                                d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/>
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => {
                                                        setSubType('design')
                                                    }}
                                                            className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'design' ?
                                                                ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 ' : subType === 'office' ?
                                                                    ' bg-zinc-800 rounded-2xl row-start-3' : ' bg-zinc-800 rounded-2xl row-start-1')}>

                                                        <div>
                                                            Дизайн
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className={"w-10 h-10 " + (subType === "design" ? "fill-black  " : " fill-gray-400 ")}
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path
                                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => {
                                                        setSubType('school')
                                                    }}
                                                            className={'flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl ' + (subType === 'school' ?
                                                                ' bg-[#00c78d] text-black font-medium transition duration-500 ease-in-out  scale-110 row-start-2' : ' bg-zinc-800 rounded-2xl')}>


                                                        <div>
                                                            Для школы
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className={"w-10 h-10 " + (subType === "school" ? "fill-black  " : " fill-gray-400 ")}
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                                        </svg>
                                                    </button>

                                                </div>

                                                : null
                                }
                                <div className={'grid grid-rows-3 gap-y-5'}>
                                    <div className={'place-self-center row-start-2 '}>

                                        <div className={'self-center pt-2 ' + (bounce2 ? 'visible' : 'invisible')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 className="w-8 h-8 fill-[#00c78d] animate-bounceNew "
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {
                                    subType === 'design' ?
                                        <div className={' grid grid-rows-3  gap-y-5  text-gray-400 font-normal'}>
                                            <button onClick={() => {
                                                setSubSubType('2d')
                                            }}
                                                    className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full rounded-2xl  ' +
                                                        (subSubType === '2d' ?
                                                            ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                            ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                <div>
                                                    2D
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subSubType === "2d" ? "  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727v-.743zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.743z"/>
                                                    <path
                                                        d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => {
                                                setSubSubType('3d')
                                            }}
                                                    className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full rounded-2xl  ' +
                                                        (subSubType === '3d' ?
                                                            ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                            ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                <div>
                                                    3D
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subSubType === "3d" ? "  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.52 8.368h.664c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zm3.606-3.367V11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984H8.126zm1.187.967h.844c1.112 0 1.621.686 1.621 2.04 0 1.353-.505 2.02-1.621 2.02h-.844v-4.06z"/>
                                                    <path
                                                        d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => {
                                                setSubSubType('effects')
                                            }}
                                                    className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl  ' +
                                                        (subSubType === 'effects' ?
                                                            ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                            ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                <div>
                                                    Моушен
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={"w-10 h-10 " + (subSubType === "effects" ? "  " : " fill-gray-400 ")}
                                                     viewBox="0 0 16 16">

                                                    <path
                                                        d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                                    <path fill-rule="evenodd"
                                                          d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                                                </svg>
                                            </button>
                                        </div> :
                                        subType === 'it' ?
                                            <div
                                                className={'col-span-2 grid grid-rows-3  gap-y-5  text-gray-400 font-normal'}>
                                                <button onClick={() => {
                                                    setSubSubType('app')
                                                }}
                                                        className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl  ' +
                                                            (subSubType === 'app' ?
                                                                ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                                ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                    <div>
                                                        Приложения
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={"w-10 h-10 " + (subSubType === "app" ? "  " : " fill-gray-400 ")}
                                                         viewBox="0 0 16 16">
                                                        d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0
                                                        .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                                                        <path
                                                            d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => {
                                                    setSubSubType('neural')
                                                }}
                                                        className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl  ' +
                                                            (subSubType === 'neural' ?
                                                                ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                                ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                    <div>
                                                        Нейросеть
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={"w-10 h-10 " + (subSubType === "neural" ? "  " : " fill-gray-400 ")}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => {
                                                    setSubSubType('games')
                                                }}
                                                        className={'justify-self-start flex flex-col space-y-4 items-center py-5 w-full  rounded-2xl  ' +
                                                            (subSubType === 'games' ?
                                                                ' bg-[#00c78d] font-medium text-black transition duration-500 ease-in-out  scale-110  ' :
                                                                ' bg-zinc-800 text-gray-400 font-normal   ')}>
                                                    <div>
                                                        Игры
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={"w-10 h-10 " + (subSubType === "games" ? "  " : " fill-gray-400 ")}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"/>
                                                        <path
                                                            d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"/>
                                                    </svg>
                                                </button>
                                            </div> :
                                            <div></div>

                                }
                            </div>


                        </div>
                        : custom === 'personal' ?
                            <div className={'grid grid-cols-5 grid-rows-4 text-gray-400 text-xl gap-x-6 gap-y-6 mx-10 '}
                                 style={{height: height}}>
                                <div className={'col-span-5 row-span-3  rounded-2xl flex flex-row place-items-center'}>
                                    <div className={' flex flex-col text-white text-xl items-center px-14'}>
                                        <div className={'pb-4'}>
                                            МОДЕЛЬ КОРПУСА
                                        </div>
                                        <div className={'bg-zinc-800 rounded-xl w-52 '}>
                                            <img className={'w-48 object-scale-down object-center'}
                                                 src={`http://localhost:3001/${main.image}`} alt={''}/>
                                        </div>

                                        {
                                            main.id === cases[6].id ? <div className={'text-sm '}>
                                                Стандартная модель</div> : <div className={'text-sm '}>Ваш выбор</div>
                                        }

                                    </div>
                                    <div id={'journal-scroll'}
                                         className={'grid grid-cols-3 gap-y-4 gap-x-4   px-2 overflow-x-scroll'}>
                                        {cases?.filter(x => x.id !== main.id).map((item, key) => {
                                            return <button onClick={() => setMain(item)} className={' w-36'}
                                                           key={key.toString()}>
                                                <ItemCases item={item}/>
                                            </button>
                                        })}


                                    </div>
                                </div>
                                <div
                                    className={'col-span-3 flex flex-row justify-around bg-zinc-800 rounded-2xl  text-white text-xl items-center '}>

                                    <div className={'flex flex-col justify-center items-center space-y-2 '}>
                                        <div>
                                            ЦВЕТ КОРПУСА
                                        </div>
                                        <div className={'w-44 h-8 rounded-lg '} style={{backgroundColor: color}}>

                                        </div>
                                    </div>
                                    <div className={' '}>
                                        <div
                                            className={'grid grid-cols-7 grid-rows-2 gap-x-1 gap-y-1'}>
                                            {
                                                colors.map((item, key) => {
                                                    return <button onClick={() => setColor(item)}
                                                                   key={key.toString()}
                                                                   style={{backgroundColor: item}}
                                                                   className={'w-8 h-8 rounded-lg focus:animate-bounce focus:shadow-black focus:shadow-sm'}>

                                                    </button>
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={'col-span-2 bg-zinc-800 rounded-2xl flex flex-row justify-between px-6 items-center text-white'}>
                                    <div className={'flex flex-col justify-center items-center space-y-2 '}>
                                        <div>
                                            ПОДСВЕТКА
                                        </div>
                                        {
                                            colorLight ? <div className={'w-44 h-8 rounded-lg '}
                                                              style={{backgroundColor: colorLight}}>

                                            </div> : <div className={'text-sm'}>
                                                Без подсветки
                                            </div>
                                        }
                                    </div>
                                    <div className={' '}>
                                        <div
                                            className={'grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1'}>
                                            {
                                                colorsLight.map((item, key) => {
                                                    return <button onClick={() => setColorLight(item)}
                                                                   key={key.toString()}
                                                                   style={{backgroundColor: item}}
                                                                   className={'w-8 h-8 rounded-lg focus:animate-bounce focus:shadow-black focus:shadow-sm'}>

                                                    </button>
                                                })
                                            }
                                            <button onClick={() => setColorLight('')}
                                                    className={'w-8 h-8 rounded-lg bg-zinc-900'}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={''}
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div style={{height: height}}
                                 className={'flex flex-col justify-between items-center space-y-2'}>
                                <div>

                                </div>
                                <div className={'flex flex-col justify-end items-center space-y-2'}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             className="w-9 h-9 fill-[#00c78d] animate-bounce " viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                                        </svg>
                                    </div>
                                    <button onClick={() => setResult(!result)}
                                            className={' w-60  font-medium text-xl flex flex-row justify-center'}>
                                        <div
                                            className={'text-black py-3 px-5 rounded-2xl bg-[#00c78d] font-medium'}>Результат
                                        </div>
                                    </button>
                                </div>
                            </div>
                }
            </div>
            <div className={'basis-1/3 flex flex-col  relative z-0'}>
                <div className={'text-2xl text-white'}>
                    Мы поможем преобразовать внешний вид и производительность вашего компьютера
                </div>
                <div className={'text-gray-400 '}>
                    Помогите нам сделать это, ответив на несколько вопросов,
                    благодаря которым мы поймем что подходит именно вам
                </div>
            </div>
        </div>

    </div>

}


export default Custom
