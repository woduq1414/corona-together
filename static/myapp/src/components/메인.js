import React, {useEffect, useState} from "react";

import "../styles/메인.css";


const 메인 = props => {


    return (
        <React.Fragment>
            <div className={"main_container"}>
                <div className={"main_left"}>
                    <div className={"main_title"}>코로나<span className={"comma"}>,</span>
                        <br/>함께<span className={"blank"}>,,</span></div>
                </div>
                <div className={"main_vl"}></div>
                <div className={"main_right"}>
                    <div className={"main_subtitle"}>누군가의 힘이<br/>되어주세요</div>
                </div>
            </div>

            <div className={'icon-scroll'}></div>


            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        </React.Fragment>


    );
};
//aa
export default 메인;
