import ShoppingBag from '../../content/shopping-bag2.png'
import Chat from '../../content/chat.png'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/features/auth/AuthSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";



function Profile() {

    const User = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/')
        toast('Вы вышли из системы')
    }

    return <div className={'absolute right-0 top-4  rounded-l-2xl bg-zinc-700 px-12 h-screen '}>

            <div className={'flex flex-col text-white font-light space-y-8 pt-2 '}>
                <div className={'flex flex-row space-x-7'}>
                    <button onClick={()=>{logoutHandler()}}>
                        выйти
                    </button>
                    <button>
                        настройки
                    </button>
                    <button>
                        профиль
                    </button>
                    <button className=" border-0   focus:outline-none  ">
                        <div className={'bg-gray-200 rounded-full w-9 h-9'}/>
                    </button>
                </div>
                <div className={'text-xl'}>
                    Добрый день, <span className={'font-medium'}>{User.name}</span>
                </div>
                <div className={'grid grid-cols-2 gap-6 px-5 text-black font-medium'}>
                    <div className={'bg-gray-300 h-44 rounded-2xl flex flex-col justify-center space-y-8'}>
                        <div className={'place-self-center'}>
                            <img src={ShoppingBag} className={' w-16 h-16'} alt={''}/>
                        </div>
                        <div className={'text-center'}>
                            Заказы
                        </div>
                    </div>
                    <div className={'bg-gray-300 h-44 rounded-2xl flex flex-col justify-center space-y-8'}>
                        <div className={'place-self-center'}>
                            <img src={Chat} className={' w-16 h-16'} alt={''}/>
                        </div>
                        <div className={'text-center'}>
                            Отзывы
                        </div>
                    </div>
                    <div className={'bg-gray-300 h-44 rounded-2xl flex flex-col'}>
                        <div>

                        </div>
                        <div className={'text-center'}>
                            Избранное
                        </div>
                    </div>
                    <div className={'bg-gray-300 h-44 rounded-2xl flex flex-col'}>
                        <div>

                        </div>
                        <div className={'text-center'}>
                            Сравнение
                        </div>
                    </div>
                </div>
            </div>


    </div>
}

export default Profile