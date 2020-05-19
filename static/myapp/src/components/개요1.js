import React, {useEffect, useState} from "react";

import "../styles/개요.css";
import CountUp from 'react-countup';
import anime from 'animejs/lib/anime.es.js';

import {withRouter} from "react-router-dom";


const 개요1 = props => {


    return (
        <React.Fragment>
            <div className={"outline_container"}>
                <div className={"outline_title"}>
                    코로나 시작으로부터 <span className={"anime numCounter pos_1_0"} start={0} end={115}></span>일째,
                </div>
                <div className={"outline_infoContainer"}>
                    <div className={"outline_info"}>
                        <div className={"outline_icon"}>
                            <img className={"outline_image"} src={require('../images/검사.png')}/>
                        </div>
                        <div className={"outline_text"}>
                            <span className={"anime numCounter pos_1_0"} start={0} end={698574}>0</span>명 검사
                        </div>
                    </div>
                    <div className={"outline_info"}>
                        <div className={"outline_icon"}>
                            <img className={"outline_image"} src={require('../images/확진.png')}/>
                        </div>
                        <div className={"outline_text"}>
                             <span className={"anime numCounter pos_1_0"} start={0} end={48321}>0</span>명 확진
                        </div>
                    </div>
                    <div className={"outline_info"}>
                        <div className={"outline_icon"}>
                            <img className={"outline_image"} src={require('../images/완치.png')}/>
                        </div>
                        <div className={"outline_text"}>
                            <span className={"anime numCounter pos_1_0"} start={0} end={54654}>0</span>명 완치
                        </div>
                    </div>
                </div>
                <div className={"outline_bottomText"}>
                    그리고, 대처에 대해 전 세계로부터 인정받고 있습니다.
                </div>
            </div>

        </React.Fragment>


    );
};
//aa
export default 개요1;
