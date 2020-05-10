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
import CountUp from 'react-countup';

import anime from 'animejs/lib/anime.es.js';


import "./styles/nav.css";

import 메인 from "./components/메인"
import 개요1 from "./components/개요1"
import 개요2 from "./components/개요2"
import 힘든점 from "./components/힘든점"
import 응원 from "./components/응원"

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
            dragAndMove={true}
            slidesNavigation={true}
            slidesNavPosition={'bottom'}
            onLeave={({index, nextIndex, direction}) => {
                // alert(index);
                // let el = document.getElementsByClassName('numCounter')[0];
                // console.log("!!", el);
                // let event = document.createEvent("MouseEvents");
                // event.initEvent("click", false, true);
                // //let event = new Event('build');
                // el.dispatchEvent(event);
                // el.temp();
                var selector = "";
                var destNum = 695786;


                // var toAnimateList = document.querySelectorAll(selector + " .to-animate");
                // toAnimateList.forEach(function (elem) {
                //     elem.classList.add("to-animate--active")
                // });


                anime({
                    targets: ".numCounter",
                    textContent: destNum,
                    easing: 'easeOutSine',
                    round: 1,
                    duration: 2000,
                });

            }
            }

            render={({state, fullpageApi}) => {
                return (
                    <React.Fragment>

                        <div className={"side"}>


                        </div>

                        <div className={"content"}>
                            <ReactFullpage.Wrapper>
                                <div className="section" id={"메인"}>
                                    <메인/>
                                </div>
                                <div className="section">
                                    <div className="slide" data-anchor="slide1" id={"개요1"}>
                                        <개요1/>
                                    </div>
                                    <div className="slide" data-anchor="slide2" id={"개요2"}>
                                        <개요2/>
                                    </div>
                                </div>
                                <div className="section">
                                    <div className="slide" data-anchor="slide1" id={"힘든점"}>
                                        <힘든점/>
                                    </div>
                                    <div className="slide" data-anchor="slide2" id={"응원"}>
                                        <응원/>
                                    </div>
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