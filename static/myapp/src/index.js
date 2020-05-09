// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
//
//
//
// ReactDOM.render(<App />, document.getElementById("root"));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';

import "./styles/nav.css";

import 메인 from "./components/메인"

const Fullpage = () => (
    <div>
        <nav>
            <ul id={"myMenu"}>
                <li data-menuanchor="firstPage" className="active"><a href="#firstPage">코로나, 함께</a></li>
                <li data-menuanchor="secondPage"><a href="#secondPage/slide1">개요</a></li>
                <li data-menuanchor="thirdPage"><a href="#thirdPage">우리의 생각</a></li>
                <li data-menuanchor="fourthPage"><a href="#fourthPage">생각 모음</a></li>
            </ul>
        </nav>
        <ReactFullpage
            //fullpage options
            licenseKey={'OPEN-SOURCE-GPLV3-LICENCE'}
            scrollingSpeed={1000} /* Options here */
            anchors={['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage']}
            menu={'#myMenu'}
            navigation={true}
            navigationPosition={'right'}
            render={({state, fullpageApi}) => {
                return (
                    <React.Fragment>

                        <div className={"side"}>


                        </div>

                        <div className={"content"}>
                            <ReactFullpage.Wrapper>
                                <div className="section">
                                    <메인/>
                                </div>
                                <div className="section" style={{"background" : "gray"}}>
                                    <div className="slide" data-anchor="slide1">Twoassssssssssssssssssss 1</div>
                                    <div className="slide" data-anchor="slide2">Twosaaaaaaaaaaaaaaaaaaaa 2</div>
                                </div>
                                <div className="section">
                                    <p>Section 3</p>
                                </div>
                                <div className="section">
                                    <p>Section 4</p>
                                </div>

                            </ReactFullpage.Wrapper>
                        </div>

                    </React.Fragment>
                );
            }}
        />

    </div>


);

ReactDOM.render(<Fullpage/>, document.getElementById('root'));