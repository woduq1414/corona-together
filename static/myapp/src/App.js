import React, {useContext} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./components/app/Main";
import Navbar from "./components/nav/Navbar"
import Login from "./components/nav/Login"
import Register from "./components/nav/Register"

// import {Wrapper} from "./components/nav/Wrapper"
import {UserProvider} from "./components/nav/UserProvider"
import {UserContext} from "./contexts/UserContext"

const App = props => {

    const userInfo = useContext(UserContext);

    return (
        <BrowserRouter>

            <UserProvider>

                <Navbar/>


                <Switch>


                    <Route exact path="/" component={Main}/>

                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>




                </Switch>
            </UserProvider>

        </BrowserRouter>
    );
};

export default App;
