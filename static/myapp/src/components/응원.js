import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import 더보기 from "./modals/더보기";
import 응원쓰기 from "./modals/응원쓰기";
import 태그컨테이너 from "./태그컨테이너";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


import "../styles/응원.css";


let cheer = {
    "startIndex": 0, "data": [
        {"title": "제목1", "content": "내용1"},
    ]
};
const 응원 = props => {


    const [limit, setLimit] = useState(2);

    function prev() {
        let startIndex = cheer.startIndex;
        startIndex -= limit;
        if (startIndex < 0) {
            startIndex = 0;
        }
        props.setCheer({"startIndex": startIndex, "data": [...cheer.data]})
    }

    function next() {
        let startIndex = cheer.startIndex;
        startIndex += limit;
        if (startIndex >= cheer.data.length) {
            startIndex = 0;
        }
        props.setCheer({"startIndex": startIndex, "data": [...cheer.data]})
    }

    function showMore(cheer) {

        MySwal.fire({
            "html": (


                <div className={"mc_contentText scroll"}
                     style={{
                         "background-image":
                             `-webkit-linear-gradient(left, white 0, transparent 0), -webkit-linear-gradient(right, white 0, transparent 0),
                                                -webkit-linear-gradient(${cheer.color} 2.9rem, #aaa 2.9rem, #aaa 3rem, white 3rem)`
                     }
                     }
                >
                    {cheer.content}
                </div>


            ),
            "customClass": {
                "popup": "mc_content",
                "content": "more_modalContent",
                "actions": 'more_footer',
                'confirmButton': 'more_exitButton',
            },
            "scrollbarPadding" : false
            // "customClass": {
            //     "popup": "more_modalContainer",
            //     "content": "more_modalContent",
            //     "actions": 'more_footer',
            //     'confirmButton': 'more_exitButton',
            // }
        })
        document.getElementsByClassName("mc_content")[0].style.backgroundColor = cheer.color;


    }

    function writeCheer() {

        MySwal.fire({
            "html": (
                <응원쓰기 tagList={props.tagList}/>
            ),
            "customClass": {
                "popup": "wc_modalContainer",
                "content": "wc_modalContent",
                "actions": 'wc_footer',
                'confirmButton': 'wc_exitButton',
            },
            "showCancelButton": true,
            "reverseButtons": true,
            "scrollbarPadding" : false
        })

    }


    console.log(props.cheer)
    cheer = props.cheer
    useEffect(() => {
        try {
            // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
            const el = document.getElementById('cheer_contents');
            const el2 = document.getElementById('cheer_contents').cloneNode(true);
            el.style.display = "none";
            el2.style.display = "flex";
            document.getElementsByClassName("cheer_contentContainer")[0].prepend(el2);
            const height = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().height;
            const width = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().width;
            el.style.display = "flex";
            document.getElementsByClassName("cheer_contentContainer")[0].removeChild(el2);
            //const height = document.getElementById('cheer_contents').getBoundingClientRect().height;

            const oneHeight = document.getElementsByClassName("cheer_content")[0].getBoundingClientRect().height * 4 / 3;
            const oneWidth = document.getElementsByClassName("cheer_content")[0].getBoundingClientRect().width;

            setLimit(Math.floor(height / oneHeight) * Math.floor(width / oneWidth));
            console.log("heel", Math.floor(height / oneHeight) * Math.floor(width / oneWidth));
        } catch (e) {

        }

    }, [props.debouncedSize]);


    return (
        <React.Fragment>


            <div className={"cheer_container"}>
                {/*<button onClick={toggleModal}>Show Modal</button>*/}
                {/*<CustomModal*/}
                {/*    title="Item Modal"*/}
                {/*    isActive={itemModalOpen  }*/}
                {/*    handleClose={() => setItemModalOpen(false)}*/}
                {/*>*/}
                {/*    <h1>Hey</h1>*/}
                {/*</CustomModal>*/}

                <div className={"cheer_header"}>
                    <div className={"cheer_title"}>우리를 위한 응원 포스트잇</div>
                    <div className={"cheer_writeButton"} onClick={() => {
                        writeCheer()
                    }}>포스트잇 쓰기
                    </div>
                </div>

                <태그컨테이너 tag={props.tag} tagList={props.tagList} setTag={(e) => {
                    props.setTag(e)
                }}/>

                <div className={"cheer_contentContainer"}>
                    <div className={"cheer_contents"} id={"cheer_contents"}>

                        {cheer.data &&
                        cheer.data.slice(cheer.startIndex, cheer.startIndex + limit).map((cheer) => {
                            const colors = ["#85f07b", "#f9a5f5", "#a9f6f4", "#f1f29a", "#8aeec3"]

                            const color = colors[Math.floor(Math.random() * colors.length)];


                            cheer.color = color;
                            return (

                                <div className={"cheer_content"} onClick={() => {
                                    showMore(cheer)
                                }}
                                     style={{
                                         "background-color":
                                             `${color}`
                                     }}
                                >

                                    <div className={"cheer_contentText"} style={{
                                        "background-image":
                                            `-webkit-linear-gradient(left, white 0, transparent 0), -webkit-linear-gradient(right, white 0, transparent 0),
                                                -webkit-linear-gradient(${color} 2.3rem, #aaa 2.3rem, #aaa 2.4rem, white 2.4rem)`
                                    }
                                    }>
                                        {cheer.content}
                                    </div>

                                </div>

                            )
                        })

                        }


                        {/*<div className={"cheer_content"}>*/}
                        {/*    <div className={"cheer_contentTitle"}>*/}
                        {/*        급식이 먹고 싶어요*/}
                        {/*    </div>*/}
                        {/*    <div className={"cheer_contentText"}>*/}
                        {/*        지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요*/}
                        {/*        아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고*/}
                        {/*        진짜 급식 언제 주냐고*/}
                        {/*    </div>*/}
                        {/*    <div className={"cheer_more"}>*/}
                        {/*        더 보기*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"cheer_content"}>*/}
                        {/*    <div className={"cheer_contentTitle"}>*/}
                        {/*        급식이 먹고 싶어요*/}
                        {/*    </div>*/}
                        {/*    <div className={"cheer_contentText"}>*/}
                        {/*        지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요*/}
                        {/*        아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고*/}
                        {/*        진짜 급식 언제 주냐고*/}
                        {/*    </div>*/}
                        {/*    <div className={"cheer_more"}>*/}
                        {/*        더 보기*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"cheer_footer"}>
                        <div className={"cheer_prev"} onClick={() => {
                            prev()
                        }}>
                            이전
                        </div>
                        <div className={"cheer_next"} onClick={() => {
                            next()
                        }}>
                            다음
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    );
};
//aa
export default 응원;
