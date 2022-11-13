import Login from "./Login";
import Registration from "./Registration";
import {useSelector} from "react-redux";


function AuthPage() {

    const isFlip = useSelector((state) => state.auth.flip)

    return <div className={'flex flex-row justify-center h-screen relative font-Montserrat'}>
        <div  className={isFlip?'absolute animate-regToRight':'absolute animate-regToLeft'}>
            <Registration/>
        </div>
        <div className={isFlip?'absolute top-4 animate-logToLeft ':' animate-logToRight absolute top-4 '}>
            <Login/>
        </div>
    </div>
}

export default AuthPage
