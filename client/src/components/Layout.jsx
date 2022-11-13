import React, {useEffect} from "react";
import Navbar from "./Navbar";
import {useLocation} from "react-router-dom";
import NavForUser from "./NavForUser";
import {useSelector} from "react-redux";
import {checkIsAuth} from "../redux/features/auth/AuthSlice";
import Footer from "./Footer";


function Layout({children}) {

    const location = useLocation()
    const isAuth = useSelector(checkIsAuth)
    const {menu} = useSelector((state) => state.main)

    useEffect(() => {
        // document.body.style.overflow = "hidden";
    }, [menu]);


    return<React.Fragment>
       <div  className={'font-Montserrat '+(menu?' ':'')}  >
           {
               isAuth&&location.pathname==='/me'?<NavForUser/>:<Navbar/>
           }
           {children}
           <Footer/>
       </div>
    </React.Fragment>
}

export default Layout
