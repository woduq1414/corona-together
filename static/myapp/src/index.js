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
import {useEffect, useState} from "react";
import "../node_modules/hover.css/css/hover-min.css"
import "./styles/nav.css";

import 메인 from "./components/메인"
import 개요1 from "./components/개요1"
import 개요2 from "./components/개요2"
import 힘든점 from "./components/힘든점"
import 응원 from "./components/응원"
import 생각모음 from "./components/생각모음"


import useDebounce from "./lib/useDebounce";

import {ToastContainer, toast} from 'react-toastify';

import {GetTag} from "./api/Tag"
import {GetDifficult} from "./api/Difficult";
import {GetCheer} from "./api/Cheer";


function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}


function animate(elements) {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    for (let i = 0; i < elements.length; i++) {
        let el = elements[i]
        //el.innerHTML = el.getAttribute('start') * 1;
        let temp = {"data": el.getAttribute('start') * 1};
        anime({
            targets: temp,
            data: el.getAttribute('end') * 1,
            easing: 'easeOutExpo',
            round: 1,
            duration: 6000,
            update: function () {
                el.innerHTML = numberWithCommas(temp.data);
            }
        });
    }
}

// const pluginWrapper = () => {
//     require('./lib/drag');
// };


const Fullpage = () => {


    const size = useWindowSize();
    const debouncedSize = useDebounce(size.height + size.width, 300);


    const [tag, setTag] = useState(0);
    const [diff, setDiff] = useState([]);
    const [cheer, setCheer] = useState([]);
    const [tagList, setTagList] = useState([""]);

    const [active, setActive] = useState(0);

    const [tagLoaded, setTagLoaded] = useState(false);


    async function GetTagHandler() {
        let response = await GetTag()
        setTagList(response.data);
        let tagList = response.data;
        console.log(tag)
        const tags = document.getElementsByClassName('tag_tag');
        console.log(tags)
        if (tags[tag] != undefined) {
            for (let i = 0; i < tags.length; i++) {
                tags[i].classList.remove('active');
            }
            const targets = document.querySelectorAll(`[tagIndex="${tag}"]`)
            for (let i = 0; i < targets.length; i++) {
                targets[i].classList.add('active');
            }

            let temp = [];
            let temp2 = [];


            async function GetDifficultHandler() {
                const res = await GetDifficult({"tagName": tagList[tag]});
                switch (res.status) {
                    case 200:

                        setDiff({
                            "startIndex": 0, "data": res.data
                        })
                        break;
                }
            }

            async function GetCheerHandler() {
                const res = await GetCheer({"tagName": tagList[tag]});
                switch (res.status) {
                    case 200:

                        setCheer({
                            "startIndex": 0, "data": res.data
                        })
                        break;
                }
            }

            GetDifficultHandler();
            GetCheerHandler();


            //  setDiff({
            //     "startIndex": 0, "data": temp
            // })


        }
        setTagLoaded(true);

    }

    useEffect(() => {
        GetTagHandler();

        // let arrows = document.getElementsByClassName("fp-next");
        // for(let el of arrows){
        //     el.classList.add("hvr-forward");
        // }
        // arrows = document.getElementsByClassName("fp-prev");
        // for(let el of arrows){
        //     el.classList.add("hvr-backward");
        // }

    }, []);

    useEffect(() => {
        // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.


        if (tagLoaded == false) return;


        console.log(tag)
        const tags = document.getElementsByClassName('tag_tag');
        console.log(tags)
        if (tags[tag] != undefined) {
            for (let i = 0; i < tags.length; i++) {
                tags[i].classList.remove('active');
            }
            const targets = document.querySelectorAll(`[tagIndex="${tag}"]`)
            for (let i = 0; i < targets.length; i++) {
                targets[i].classList.add('active');
            }

            let temp = [];
            let temp2 = [];
            // for (let i = 0; i < 10; i++) {
            //
            //     temp2.push({"content": `${tagList[tag]}에 대한 응원${i + 1}`.repeat(30)})
            // }
            //
            // // setDiff({
            // //     "startIndex": 0, "data": [
            // //         {"title": "제목1", "content": "내용1"},
            // //         {"title": "제목2", "content": "내용2"},
            // //         {"title": "제목3", "content": "내용3"},
            // //         {"title": "제목4", "content": "내용4"},
            // //         {"title": "제목5", "content": "내용5"},
            // //         {"title": "제목6", "content": "내용6"}
            // //     ]
            // // })
            //
            //
            // setCheer({
            //     "startIndex": 0, "data": temp2
            // })

            async function GetDifficultHandler() {
                const res = await GetDifficult({"tagName": tagList[tag]});
                switch (res.status) {
                    case 200:

                        setDiff({
                            "startIndex": 0, "data": res.data
                        })
                        break;
                }
            }

            async function GetCheerHandler() {
                const res = await GetCheer({"tagName": tagList[tag]});
                switch (res.status) {
                    case 200:

                        setCheer({
                            "startIndex": 0, "data": res.data
                        })
                        break;
                }
            }

            GetDifficultHandler();
            GetCheerHandler();


        }


    }, [tag]);


    return (
        <div>
            <nav>
                <ul id={"myMenu"}>
                    <li data-menuanchor="메인" className="active"><div><a href="#메인">코로나, 함께</a></div></li>
                    <li data-menuanchor="개요"><div><a href="#개요">개요</a></div></li>
                    <li data-menuanchor="우리의생각"><div><a href="#우리의생각">우리의 생각</a></div></li>
                    <li data-menuanchor="생각모음"><div><a href="#생각모음">생각 모음</a></div></li>
                </ul>
            </nav>
            <ReactFullpage
                //fullpage options
                // pluginWrapper={pluginWrapper}

                licenseKey={'OPEN-SOURCE-GPLV3-LICENCE'}
                scrollingSpeed={1000} /* Options here */
                anchors={['메인', '개요', '우리의생각', '생각모음']}
                menu={'#myMenu'}
                navigation={true}
                navigationPosition={'right'}
                dragAndMove={true}
                slidesNavigation={true}
                slidesNavPosition={'bottom'}
                normalScrollElements={'.more_content'}
                onSlideLeave={(section, origin, destination, direction) => {
                    const counters = document.querySelectorAll(`.anime[class*="pos_${section.index}_${destination.index}"]`)
                    animate(counters)


                }
                }

                onLeave={(origin, destination, direction) => {
                    const counters = document.querySelectorAll(`.anime[class*="pos_${destination.index}"]`)
                    animate(counters)

                    setActive(destination.index)
                }
                }

                render={({state, fullpageApi}) => {
                    return (
                        <React.Fragment>
                            <div className={"full"}>

                            </div>


                            <div className={"side"}>


                            </div>

                            <div className={"content"}>
                                <ReactFullpage.Wrapper>
                                    <div className="section" id={"_메인"}>
                                        <메인/>
                                    </div>
                                    <div className="section">
                                        <div className="slide" data-anchor="첫번째" id={"_개요1"}>
                                            <개요1 animate={(t) => animate(t)}/>
                                        </div>
                                        <div className="slide" data-anchor="두번째" id={"_개요2"}>
                                            <개요2/>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="slide " data-anchor="힘든점" id={"_힘든점"}>
                                            <힘든점
                                                debouncedSize={debouncedSize}
                                                setDiff={(t) => setDiff(t)}
                                                setTag={(t) => setTag(t)}
                                                tagList={tagList}
                                                tag={tag}
                                                diff={diff}

                                            />

                                        </div>
                                        <div className="slide  " data-anchor="응원" id={"_응원"}>
                                            <응원
                                                debouncedSize={debouncedSize}
                                                setCheer={(t) => setCheer(t)}
                                                setTag={(t) => setTag(t)}
                                                tagList={tagList}
                                                tag={tag}
                                                cheer={cheer}/>
                                        </div>
                                    </div>
                                    <div className="section" id={"_생각모음"}>

                                        <생각모음
                                            debouncedSize={debouncedSize}
                                            tagList={tagList}
                                            tag={tag}
                                            setTag={(t) => setTag(t)}
                                            activeSection={active}
                                        />

                                    </div>

                                </ReactFullpage.Wrapper>
                            </div>

                        </React.Fragment>
                    );
                }}
            />

        </div>


    )
};

ReactDOM.render(<Fullpage/>, document.getElementById('root'));