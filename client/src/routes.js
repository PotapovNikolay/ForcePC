// import React from "react";
// import {Routes, Route, Navigate} from "react-router-dom";
// import {LinkPage} from "./components/LinkPage";
// import {CreatePage} from "./components/CreatePage";
// import {DetailPage} from "./components/DetailPage";
// import {AuthPage} from "./components/Auth";
//
// export const useRoutes = isAuthenticated=>{
//     if (isAuthenticated){
//         return <Routes>
//             <Route path={'/links'} exact>
//                 <LinkPage/>
//             </Route>
//             <Route path={'/create'} exact>
//                 <CreatePage/>
//             </Route>
//             <Route path={'/detail/:id'} >
//                 <DetailPage/>
//             </Route>
//             <Navigate to={'/create'}/>
//         </Routes>
//     }
//     return <Routes>
//         <Route path={'/'} exact>
//             <AuthPage/>
//         </Route>
//         <Navigate to={'/'}/>
//     </Routes>
// }