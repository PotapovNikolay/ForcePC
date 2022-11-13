import { NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/auth/AuthSlice";
import {toast} from "react-toastify";
import MePage from "../pages/account/MePage";
import Profile from "../pages/account/Profile";

function profile(){
    return<div className={'absolute inset-y-0 right-0 text-white'}>
dsd
    </div>
}

function NavForUser() {

    const location = useLocation()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        dispatch(logout())
        window.local.storage.removeItem('token')
        toast('выход')
    }


    return <div className={'font-Montserrat relative'}>
        <header className="text-white ">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center  ">
                <NavLink to={'/'} className={"flex flex-col title-font font-medium items-center  mb-4 md:mb-0 mr-5"}>
                    <div className={'invisible green-line '}/>
                    <span className="ml-3 text-xl">ForcePC</span>
                </NavLink>
                <nav className={" flex flex-row space-x-5  items-center text-base justify-center ml-5"}>
                    <NavLink to={'/store'} className={"group  flex flex-col "}>
                        {location.pathname==='/store'?<div className={'green-line  '}/>
                            :<div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Сборки</span>
                    </NavLink>
                    <NavLink to={'/grade'} className={"group  flex flex-col "}>
                        {location.pathname==='/grade'?<div className={'green-line  '}/>
                            :<div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Оценка</span>
                    </NavLink>
                    <NavLink to={'/reviews'} className={"group  flex flex-col "}>
                        {location.pathname==='/reviews'?<div className={'green-line  '}/>
                            :<div className={'gray-line invisible group-hover:visible   '}/>
                        }

                        <span>Отзывы</span>
                    </NavLink>
                    <NavLink to={'/support'} className={"group  flex flex-col "}>
                        {location.pathname==='/support'?<div className={'green-line  '}/>
                            :<div className={'gray-line invisible group-hover:visible   '}/>
                        }
                        <span>Поддержка</span>
                    </NavLink>
                    <Profile/>
                </nav>
            </div>
        </header>
    </div>
}

export default NavForUser
