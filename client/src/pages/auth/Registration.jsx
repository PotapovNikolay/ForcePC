import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, flipping, registrationUser} from "../../redux/features/auth/AuthSlice";
import {toast} from 'react-toastify'
import {useNavigate} from "react-router-dom"


function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [sername, setSername] = useState('')
    const [phone, setPhone] = useState('')
    const [erEmail, setErEmail] = useState('')
    const [erPassword, setErPassword] = useState('')
    const [erPhone, setErPhone] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const isFlip = useSelector((state) => state.auth.flip)

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    function phoneValidation(phone) {
        if (phone === '') {
            return true;
        }
        const regex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
        if (regex.test(phone) === false) {
            setErPhone('error')
            return false;
        }
        return true;
    }

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

// && phoneValidation(phone)
    function handleSubmit() {
        try {
            if (emailValidation(email)  && passwordValidation(password)) {
                dispatch(registrationUser({name, sername, password, email, phone}))
                setPassword('')
                setEmail('')
                setName('')
                setPhone('')
                setSername('')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <div className={' '}>
        <div
            className={isFlip ? 'flex flex-col rounded-[2.5rem] shadow-gray-300 bg-zinc-900 shadow-md py-10 text-white' : 'flex flex-col rounded-[2.5rem] shadow-gray-400 bg-zinc-900 shadow-md py-10 text-gray-400 blur-[1px] '}>
            <div className={'flex flex-row justify-around text-xl pb-12 '}>
                <div className={'group flex flex-col'}>
                    {isFlip ? <div className={'reg-green-line  '}/>
                        : <div className={'gray-line invisible group-hover:visible   '}/>
                    }
                    <span className={'text-2xl'}>
                    Регистрация
                </span>
                </div>
                <div className={'group flex flex-col'}>
                    {!isFlip ? <div className={'reg-green-line  '}/>
                        : <div
                            className={'animate-pulse gray-line group-hover:animate-none group-hover:gray-line group-focus:green-line group-active:green-line  '}/>
                    }
                    <button
                        onClick={() => dispatch(flipping(!isFlip))}
                        className={' text-gray-400 '}>
                        Вход
                    </button>
                </div>
            </div>
            <form noValidate onSubmit={e => e.preventDefault()}>
                <div className={'flex flex-col space-y-4 px-14 '}>
                    <div className={'flex flex-row space-x-4'}>
                        <div className={'flex flex-col space-y-1 '}>
                            <label
                                htmlFor={"text"}
                                className={' text-md '}>
                                Имя
                            </label>
                            <div>
                                <input type={"text"}
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className={'bg-zinc-900 border-0 border-b-[1px] w-56 border-white focus:outline-none focus:ring-0 focus:bg-zinc-900 border-white focus:border-white '}/>
                                <div className={'invisible text-sm'}>dsds</div>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-1'}>
                            <label
                                htmlFor={"text"}
                                className={' text-md '}>
                                Фамилия
                            </label>
                            <input type={"text"}
                                   value={sername}
                                   onChange={(e) => setSername(e.target.value)}
                                   className={'bg-zinc-900 border-0 border-b-[1px] border-white w-56 focus:outline-none focus:ring-0 focus:bg-zinc-900 border-white focus:border-white'}/>
                        </div>
                    </div>

                    <div className={'flex flex-col space-y-1 '}>
                        <label
                            htmlFor={"email"}
                            className={' text-md '}>
                            Почта
                        </label>
                        <div>
                            <input type={"email"}
                                   value={email}
                                   autoComplete={isFlip?'on':'off'}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className={' invalid:border-pink-500 invalid:text-pink-600 valid:text-[#00c78d] border-0 border-white focus:border-white caret-white bg-zinc-900 border-b-[1px] border-white w-full focus:outline-none focus:ring-0 focus:bg-zinc-900 '}/>
                            <div
                                className={erEmail === 'error' ? 'visible text-sm text-pink-600' : 'invisible text-sm'}>
                                <span>Почта введена некорректно</span>
                            </div>
                        </div>
                    </div>
                    <div className={' flex flex-row space-x-4 '}>
                        <div className={'flex flex-col space-y-1'}>
                            <label
                                htmlFor={"password"}
                                className={'text-md'}>
                                Пароль
                            </label>
                            <div>
                                <input type={"password"}
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className={(password.length<6&&password.length>0?'border-pink-500 text-pink-600':'')+'invalid:border-pink-500 border-0 invalid:text-pink-600 caret-white bg-zinc-900 border-b-[1px] w-56 border-white border-white focus:border-white focus:outline-none focus:ring-0 focus:bg-zinc-900'}/>
                                <div
                                    className={erPassword === 'error' ? 'visible text-sm text-pink-600' : password.length<6&&password.length>0? 'visible text-sm text-pink-600' :'invisible text-sm'}>
                                    {erPassword === 'error' ? <span>Пароль введен некоректно</span> :
                                        <span>Пароль слишком короткий</span>}
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-1'}>
                            <label
                                htmlFor={"tel"}
                                className={'text-md'}>
                                Телефон
                            </label>
                            <div>
                                <input type={"tel"}
                                       onChange={(e) => setPhone(e.target.value)}
                                       value={phone}
                                       className={'invalid:border-pink-500 invalid:text-pink-600 bg-zinc-900 border-0 border-b-[1px] w-56 border-white focus:outline-none focus:ring-0 focus:bg-zinc-900'}/>

                                <div
                                    className={erPhone === 'error' ? 'visible text-sm text-pink-600' : 'invisible text-sm'}>
                                    Телефон введен неверено
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={'flex flex-row justify-center'}>
                        <button
                            onClick={handleSubmit}
                            className={'bg-[#00c78d] rounded-3xl px-10 mt-6 py-1.5 bg-[#00c78d] text-black font-medium'}
                            type={'submit'}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </form>

            <div className={'flex flex-row justify-center pt-6'}>
                <div className={'flex flex-col space-y-6'}>
                    <div className={'flex flex-row justify-center '}>
                        <div className={'basis-full'}>Зарегистрироваться с помощью</div>
                    </div>
                    <div className={'flex flex-row justify-around '}>
                        <div className={'w-8 h-8 rounded-full bg-gray-200 '}>

                        </div>
                        <div className={'w-8 h-8 rounded-full bg-gray-200 '}>

                        </div>
                        <div className={'w-8 h-8 rounded-full bg-gray-200 '}>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}

export default Registration