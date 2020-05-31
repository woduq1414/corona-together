import React, {useEffect, useState} from "react";

import "../styles/생각모음.css";

import {GetWordcloud} from "../api/Data";

import {withRouter} from "react-router-dom";
import {GetCheer} from "../api/Cheer";


const 생각모음 = props => {
    useEffect(() => {
        console.log("haha")
        const el = document.getElementById('tc_imageContainer');
        let el2 = document.createElement('div');
        el2.className = 'tc_imageContainer';
        el2.id = "tc_temp";
        el.style.display = "none";

        document.getElementsByClassName("tc_container")[0].insertBefore(el2, el);
        const height = document.getElementById('tc_temp').getBoundingClientRect().height;
        const width = document.getElementById('tc_temp').getBoundingClientRect().width;
        const oneSize = Math.min(width, height) * 0.8;
        document.getElementById('tc_wordcloud').height = oneSize;
        document.getElementById('tc_wordcloud').width = oneSize;
        document.getElementsByClassName("tc_container")[0].removeChild(el2);
        el.style.display = "flex";
        //const width = document.getElementById('tc_imageContainer').getBoundingClientRect().width;
        //const height = document.getElementById('tc_imageContainer').getBoundingClientRect().height;
        //console.log(width, height)

    }, [props.debouncedSize]);

    const [wordcloud, setWordcloud] = useState("");

    useEffect(() => {
        async function GetWordcloudHandler() {
            const res = await GetWordcloud({"tagName": "학생"});
            switch (res.status) {
                case 200:

                    setWordcloud(res.data);
                    break;

                case 404:

            }

        }
        GetWordcloudHandler();
    }, [])


    return (
        <React.Fragment>
            <div className={"tc_container"}>
                <div className={"tc_title"}>
                    우리들의 생각 모음
                </div>
                <div className={"tc_imageContainer"} id={"tc_imageContainer"}>
                    <img id={"tc_wordcloud"}
                         src={wordcloud}/>
                </div>
                <div className={"tc_bottomText"}>
                    그래서, 우리 스스로를 응원해보고자 합니다.


                </div>
            </div>

        </React.Fragment>


    );
};
//aa
export default 생각모음;
