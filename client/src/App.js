import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout"
import MainPage from "./pages/main/MainPage";
import AuthPage from "./pages/auth/AuthPage";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MePage from "./pages/account/MePage";
import {useDispatch} from "react-redux";
import {getMe} from "./redux/features/auth/AuthSlice";
import ListPage from "./pages/listpc/ListPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import SupportPage from "./pages/support/SupportPage";
import GradePage from "./pages/grade/GragePage";
import PCPage from "./pages/PC/PCPage";
import Grade from "./pages/main/components/Grade";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);


    return (
        <Layout>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'auth'} element={<AuthPage/>}/>
                <Route path={'me'} element={<MePage/>}/>
                <Route path={'store'} element={<ListPage/>}/>
                <Route path={'store/:id'} element={<PCPage/>}/>
                <Route path={'reviews'} element={<ReviewsPage/>}/>
                <Route path={'support'} element={<SupportPage/>}/>
                <Route path={'grade'} element={<GradePage/>}/>
            </Routes>
            <ToastContainer position={'bottom-right'} />
        </Layout>
    );
}

export default App;
