import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import AuthPage from "../../pages/AuthPage/AuthPage";
import CoachAccountPage from "../../pages/CoachAccountPage/CoachAccountPage";
import MessagesPage from "../../pages/MessagesPage/MessagesPage";
import PersonAccountPage from "../../pages/PersonAccountPage/PersonAccountPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import React, {Component} from "react";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/AuthPage" element={<AuthPage/>}/>
                    <Route path="/CoachAccountPage" element={<CoachAccountPage/>}/>
                    <Route path="/MessagesPage" element={<MessagesPage/>}/>
                    <Route path="/PersonAccountPage" element={<PersonAccountPage/>}/>
                    <Route path="/RegisterPage" element={<RegisterPage/>}/>
                    <Route path="/SearchPage" element={<SearchPage/>}/>
                </Routes>
            </BrowserRouter>
        )

    }
}

export default AppRouter