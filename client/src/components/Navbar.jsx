import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/auth/AuthSlice";
import {handleMenu} from '../redux/features/main/MainSlice'
import {useState} from "react";


function MobileDragMenu() {

    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const User = useSelector((state) => state.auth.user)
    const {menu} = useSelector((state) => state.main)

    function handleOnClick() {
        dispatch(handleMenu(!menu))
        document.body.style.overflow = ''
    }

    return <div className={' bg-zinc-800 rounded-t-3xl h-screen   '}>
        <div className={'flex flex-col  '}>

            <div className={'basis-full flex flex-row justify-center'}>
                <button onClick={() => handleOnClick()} className={'mobile-gray-line mt-2 focus:mobile-green-line  '}>

                </button>
            </div>
            <div className={'flex flex-col  '}>

                {isAuth ?
                    <div className={'ml-10 flex flex-row items-center space-x-4 my-10 mt-8'}>
                        <div className={'bg-gray-100 rounded-full w-16 h-16'}>

                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'font-medium text-2xl'}>
                                Ваш профиль
                            </div>
                            <div className={'text-sm'}>
                                Зарегистрируйтесь или войдите
                            </div>
                        </div>
                    </div>
                    : <div className={'ml-10 flex flex-row items-center space-x-4 my-10 mt-8'}>
                        <div className={'bg-gray-100 rounded-full w-16 h-16'}>

                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'font-medium text-2xl'}>
                                {/*{User.name}*/} Добрый день!
                            </div>
                            <div className={'text-sm'}>
                                Зарегистрируйтесь или войдите
                            </div>
                        </div>
                    </div>
                }
                <div className={'border-b-[1px] border-gray-400 w-screen '}>
                </div>
                <div className={'ml-10 flex flex-col  w-full space-y-8 mt-10 '}>
                    <NavLink to={'/'} className={'flex flex-row items-center space-x-4'}>
                        <div>
                            <svg className={'fill-white w-6'}
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path
                                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                        </div>
                        <div>
                            Главная
                        </div>
                    </NavLink>
                    <NavLink to={'/store'} className={'flex flex-row items-center space-x-4'}>
                        <div>
                            <svg className={'w-6 fill-white stroke-0 '}
                                 fill="currentColor"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V1Zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0ZM9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5ZM1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2H1.5Z"/>
                            </svg>
                        </div>
                        <div>
                            Магазин
                        </div>
                    </NavLink>
                    <NavLink to={'/store'} className={'flex flex-row space-x-4'}>
                        <div>
                            <svg className={'w-6   fill-white relative  z-10 '}

                                 fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                            </svg>
                        </div>
                        <div>
                            Кастомизация
                        </div>
                    </NavLink>
                    <NavLink to={'/store'} className={'flex flex-row space-x-4'}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={'w-6 fill-white stroke-0'}
                                 fill="currentColor"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                            </svg>
                        </div>
                        <div>
                            Оценка
                        </div>
                    </NavLink>
                    <NavLink to={'/store'} className={'flex flex-row space-x-4'}>
                        <div>

                            <svg
                                className={'w-6 fill-white stroke-0'}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                            </svg>
                        </div>
                        <div>
                            Отзывы
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className={'flex flex-row items-center space-x-4 ml-8 absolute bottom-1/4      '}>
                <svg className={'w-8'}
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 16 16">
                    <path
                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                    <path
                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                <div>Войти</div>
            </div>
        </div>
    </div>


}

function MobileNav() {

    const screenWidth = window.screen.width
    const height = window.screen.height
    const location = useLocation()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const User = useSelector((state) => state.auth.user)
    const {menu} = useSelector((state) => state.main)

    function handleOnClick() {
        dispatch(handleMenu(!menu))
        document.body.style.overflow = 'hidden'
    }


    return <header className={'text-white ' + (menu ? ' pt-24 fixed bg-zinc-900 z-50' : '')}>
        {
            menu
                ? <MobileDragMenu/>
                : <div className={'flex flex-row justify-between p-3  '}>
                    <div className={'text-xl'}>
                        ForcePC
                    </div>
                    <button onClick={() => handleOnClick()}
                            className={' p-1 rounded-xl text-white'}>
                        <svg className={'w-6  fill-white'} xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                             viewBox="0 0 16 16">
                            <path
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                </div>
        }

    </header>

}


function DesktopNav() {
    const location = useLocation()

    return <header className="text-white ">
        <div className=" flex flex-row justify-between  p-5 items-center items-center  ">
            <NavLink to={'/'} className={"flex flex-col  font-medium items-center mb-0 mr-5 "}>
                <div className={'invisible green-line '}/>
                <span className="ml-3 text-xl">ForcePC</span>
            </NavLink>
            <div className={'flex flex-row items-center'}>
                <nav className={" flex flex-row space-x-5 "}>
                    <NavLink to={'/store'} className={"group  flex flex-col "}>
                        {location.pathname === '/store' ? <div className={'green-line  '}/>
                            : <div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Сборки</span>
                    </NavLink>
                    <NavLink to={'/grade'} className={"group  flex flex-col "}>
                        {location.pathname === '/grade' ? <div className={'green-line  '}/>
                            : <div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Оценка</span>
                    </NavLink>
                    <NavLink to={'/reviews'} className={"group  flex flex-col "}>
                        {location.pathname === '/reviews' ? <div className={'green-line  '}/>
                            : <div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Отзывы</span>
                    </NavLink>
                    <NavLink to={'/support'} className={"group  flex flex-col "}>
                        {location.pathname === '/support' ? <div className={'green-line  '}/>
                            : <div className={'gray-line invisible group-hover:visible   '}/>
                        }
                        <span>Поддержка</span>
                    </NavLink>

                </nav>

                <NavLink to={'/auth'} className={''}>
                    <button className=" border-0 py-1 px-3 focus:outline-none text-base mt-4 md:mt-0">
                        <div className={'bg-gray-200 rounded-full w-10 h-10'}/>
                    </button>
                </NavLink>
            </div>
        </div>
    </header>
}

function Navbar() {

    const [isNav, setIsNav] = useState(false)

    const screenWidth = window.screen.width
    const location = useLocation()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const {menu} = useSelector((state) => state.main)

    function handleOnClick() {
        dispatch(handleMenu(!menu))
        // UseLockBodyScroll()
    }

    if (screenWidth > 450) {
        return <div className={'font-Montserrat  bg-zinc-900 z-50 w-screen'}>
            <DesktopNav/>
        </div>
    } else {
        return <div className={'font-Montserrat  bg-zinc-900 z-50 w-screen'}>
            <MobileNav/>
        </div>
    }


}

export default Navbar