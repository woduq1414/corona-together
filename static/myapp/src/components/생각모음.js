import React, {useEffect, useState} from "react";

import "../styles/생각모음.css";

import {GetWordcloud} from "../api/Data";

import {withRouter} from "react-router-dom";
import {GetCheer} from "../api/Cheer";


const 생각모음 = props => {
    const [wordcloud, setWordcloud] = useState({src: "오류!!", created: false});

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

    }, [props.debouncedSize, wordcloud]);



    useEffect(() => {

        async function GetWordcloudHandler() {
            const res = await GetWordcloud({"tagName": "학생"});
            switch (res.status) {
                case 200:

                    setWordcloud({src: res.data, created: true});
                    break;

                case 404:
                    setWordcloud({src: res.data, created: false});

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
                    {
                        wordcloud.created &&
                            <img id={"tc_wordcloud"}
                                 src={wordcloud.src}/>

                    }
                    {
                        !wordcloud.created &&
                            <div id={"tc_wordcloud"}>
                                {wordcloud.src}
                            </div>
                    }


                </div>
                <div className={"tc_bottomText"}>
                    {props.tagName}!!


                </div>
            </div>

        </React.Fragment>


    );
};
//aa
export default 생각모음;
