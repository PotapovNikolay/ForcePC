import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {checkIsAuth, logout} from "../../redux/features/auth/AuthSlice";
import Cart from "../account/Cart"

function MePage(){

    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
    }

    return <div className={'h-screen'}>
        {isAuth?<Cart/>:null}
    </div>
}

export default MePage