import React, {useEffect, useState} from "react";

import "../styles/개요.css";


import {withRouter} from "react-router-dom";


const 개요2 = props => {


    return (
        <React.Fragment>
            <div className={"outline_container"}>
                <div className={"outline_title"}>
                    하지만, 누군가에게는 힘든 나날이 되었을 것입니다.
                </div>
                <div className={"outline_newsContainer"}>
                    <img className={"outline_news"} src={require('../images/기사1.png')}/>
                    <img className={"outline_news"} src={require('../images/기사2.png')}/>
                    <img className={"outline_news"} src={require('../images/기사3.png')}/>
                </div>
                <div className={"outline_bottomText"}>
                    그래서, 우리 스스로를 응원해보고자 합니다.


                </div>
            </div>

        </React.Fragment>


    );
};
//aa
export default 개요2;
