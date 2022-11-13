import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {checkIsAuth, flipping, loginUser} from "../../redux/features/auth/AuthSlice";
import {useNavigate} from "react-router-dom"

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [erEmail, setErEmail] = useState('')
    const [login, setLogin] = useState('')
    const [erPassword, setErPassword] = useState('')

    // const isFlip = useSelector((state) => state.auth.flip)
    const {status, isFlip} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/me')
    }, [status, isAuth, navigate])


    function emailValidation(email) {
        const regex = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
        if (regex.test(email) === false) {
            setErEmail('error')
            return false;
        }
        return true;
    }

    function passwordValidation(password) {
        if (password === '') {
            setErPassword('error')
            return false;
        }
        if (password.length < 5) {
            setErPassword('short')
            return false;
        }
        return true;
    }

    function handleSubmit() {
        try {
            if (emailValidation(email) && passwordValidation(password)) {
                setLogin('login')
                dispatch(loginUser({password, email, login}))
                setPassword('')
                setEmail('')
                setLogin('')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <div className={' '}>
        <div
            className={isFlip ? 'flex flex-col rounded-[2.5rem] shadow-gray-300 shadow-md py-10 text-white bg-zinc-900 pb-20 blur-[1px]' : 'flex flex-col rounded-[2.5rem]  shadow-gray-300 shadow-md py-10 text-white bg-zinc-900 pb-20'}>
            <div className={'flex flex-row justify-around text-xl pb-16 bg-zinc-900 '}>
                <div className={'group hover:text-gray-900 flex flex-col'}>
                    {isFlip ? <div className={' reg-green-line  '}/>
                        : <div
                            className={'animate-pulse reg-gray-line group-hover:animate-none group-hover:reg-gray-line group-focus:reg-green-line group-active:reg-green-line  '}/>
                    }
                    <button
                        onClick={() => dispatch(flipping(!isFlip))}
                        className={'text-gray-400 '}>
                        Регистрация
                    </button>
                </div>
                <div className={'group flex flex-col'}>
                    {!isFlip ? <div className={'green-line  '}/>
                        : <div className={'gray-line invisible group-hover:visible   '}/>
                    }
                    <span className={'text-xl'}>
                    Вход
                </span>
                </div>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className={'flex flex-col space-y-6 px-20'}>
                    <div className={'flex flex-col space-y-2 '}>
                        <label
                            htmlFor={"email"}
                            className={' text-md '}>
                            Почта
                        </label>
                        <div>
                            <input type={"email"}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className={'invalid:border-pink-500 invalid:text-pink-600 caret-white autofill:bg-zinc-900 after:bg-zinc-900 bg-zinc-900 border-0 border-b-[1px]  border-white focus:border-white w-56  focus:outline-none focus:ring-0 focus:bg-zinc-900 '}/>
                            <div
                                className={erEmail === 'error' ? 'visible text-sm text-pink-600' : 'invisible text-sm'}>
                                <span>Почта введена некорректно</span>
                            </div>
                        </div>

                    </div>
                    <div className={'flex flex-col space-y-2'}>
                        <label
                            htmlFor={"password"}
                            className={'text-md'}>
                            Пароль
                        </label>
                        <div>
                            <input type={"password"}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className={(password.length<6&&password.length>0?'border-pink-500 text-pink-600':'')+'invalid:border-pink-500 invalid:text-pink-600 caret-white bg-zinc-900 border-0 border-b-[1px] focus:border-white border-white after:bg-zinc-900 autofill:bg-zinc-900  focus:outline-none focus:ring-0 focus:bg-zinc-900'}/>

                            <div
                                className={erPassword === 'error' ? 'visible text-sm text-pink-600' :password.length<6&&password.length>0? 'visible text-sm text-pink-600':'invisible text-sm'}>
                                {erPassword === 'error'? <span>Пароль введен некоректно</span> : password.length<6&&password.length>0?<span>Пароль слишком короткий</span>:null
                                    }
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-row justify-center'}>
                        <button
                            onClick={handleSubmit}
                            className={'bg-[#00c78d] rounded-3xl px-10 py-1.5 text-black font-medium'}
                            type={'submit'}>
                            Войти
                        </button>
                    </div>
                </div>
            </form>

            <div className={'flex flex-row justify-center pt-6'}>
                <div className={'flex flex-col basis-4/6 space-y-6'}>
                    <div className={'flex flex-row justify-center'}>
                        <div>Войти с помощью</div>
                    </div>
                    <div className={'flex flex-row justify-around   '}>
                        <div className={'w-8 h-8 rounded-full bg-gray-200'}>

                        </div>
                        <div className={'w-8 h-8 rounded-full bg-gray-200'}>

                        </div>
                        <div className={'w-8 h-8 rounded-full bg-gray-200'}>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}

export default Login