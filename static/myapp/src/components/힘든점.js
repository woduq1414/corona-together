import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import 더보기 from "./modals/더보기";
import 힘든점쓰기 from "./modals/힘든점쓰기";
import 태그컨테이너 from "./태그컨테이너";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


import "../styles/힘든점.css";


let diff = {
    "startIndex": 0, "data": [
        {"title": "제목1", "content": "내용1"},
    ]
};
const 힘든점 = props => {


    const [limit, setLimit] = useState(2);

    function prev() {
        let startIndex = diff.startIndex;
        startIndex -= limit;
        if (startIndex < 0) {
            startIndex = 0;
        }
        props.setDiff({"startIndex": startIndex, "data": [...diff.data]})
    }

    function next() {
        let startIndex = diff.startIndex;
        startIndex += limit;
        if (startIndex >= diff.data.length) {
            startIndex = 0;
        }
        props.setDiff({"startIndex": startIndex, "data": [...diff.data]})
    }

    function showMore(diff) {

        MySwal.fire({
            "html": (
                <더보기 diff={diff}/>
            ),
            "customClass": {
                "popup": "more_modalContainer",
                "content": "more_modalContent",
                "actions": 'more_footer',
                'confirmButton': 'more_exitButton',
            },
            "scrollbarPadding" : false
        })

    }

    function writeDiff() {

        MySwal.fire({
            "html": (
                <힘든점쓰기 tagList={props.tagList}/>
            ),
            "customClass": {
                "popup": "wd_modalContainer",
                "content": "wd_modalContent",
                "actions": 'wd_footer',
                'confirmButton': 'wd_exitButton',
            },
            "showCancelButton": true,
            "reverseButtons": true,
            "scrollbarPadding" : false
        })

    }


    console.log(props.diff)
    diff = props.diff
    useEffect(() => {
        try {
            // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
            const el = document.getElementById('diff_contents');
            const el2 = document.getElementById('diff_contents').cloneNode(true);
            el.style.display = "none";
            el2.style.display = "flex";
            document.getElementsByClassName("diff_contentContainer")[0].prepend(el2);
            const height = document.getElementsByClassName('diff_contents')[0].getBoundingClientRect().height;
            el.style.display = "flex";
            document.getElementsByClassName("diff_contentContainer")[0].removeChild(el2);
            //const height = document.getElementById('diff_contents').getBoundingClientRect().height;

            const oneHeight = document.getElementsByClassName("diff_content")[0].getBoundingClientRect().height * 4 / 3;

            setLimit(Math.floor(height / oneHeight))
            console.log(Math.floor(height / oneHeight))
        }
        catch (e){

        }


    }, [props.debouncedSize]);


    return (
        <React.Fragment>


            <div className={"diff_container"}>
                {/*<button onClick={toggleModal}>Show Modal</button>*/}
                {/*<CustomModal*/}
                {/*    title="Item Modal"*/}
                {/*    isActive={itemModalOpen  }*/}
                {/*    handleClose={() => setItemModalOpen(false)}*/}
                {/*>*/}
                {/*    <h1>Hey</h1>*/}
                {/*</CustomModal>*/}

                <div className={"diff_header"}>
                    <div className={"diff_title"}>이런 점이 힘들어요</div>
                    <div className={"diff_writeButton"} onClick={() => {
                        writeDiff()
                    }}>힘든 점 쓰기
                    </div>
                </div>

                <태그컨테이너 tag={props.tag} tagList={props.tagList} setTag={(e) => {
                    props.setTag(e)
                }}/>

                <div className={"diff_contentContainer"}>
                    <div className={"diff_contents"} id={"diff_contents"}>

                        {diff.data &&
                        diff.data.slice(diff.startIndex, diff.startIndex + limit).map((diff) => {
                            return (
                                <div>
                                    <div className={"diff_content"}>
                                        <div className={"diff_contentTitle"}>
                                            {diff.title}
                                        </div>
                                        <div className={"diff_contentText"}>
                                            {diff.content}
                                        </div>
                                        <div className={"diff_more"} onClick={() => {
                                            showMore(diff)
                                        }}>
                                            더 보기
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        }


                        {/*<div className={"diff_content"}>*/}
                        {/*    <div className={"diff_contentTitle"}>*/}
                        {/*        급식이 먹고 싶어요*/}
                        {/*    </div>*/}
                        {/*    <div className={"diff_contentText"}>*/}
                        {/*        지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요*/}
                        {/*        아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고*/}
                        {/*        진짜 급식 언제 주냐고*/}
                        {/*    </div>*/}
                        {/*    <div className={"diff_more"}>*/}
                        {/*        더 보기*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"diff_content"}>*/}
                        {/*    <div className={"diff_contentTitle"}>*/}
                        {/*        급식이 먹고 싶어요*/}
                        {/*    </div>*/}
                        {/*    <div className={"diff_contentText"}>*/}
                        {/*        지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요*/}
                        {/*        아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고*/}
                        {/*        진짜 급식 언제 주냐고*/}
                        {/*    </div>*/}
                        {/*    <div className={"diff_more"}>*/}
                        {/*        더 보기*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"diff_footer"}>
                        <div className={"diff_prev"} onClick={() => {
                            prev()
                        }}>
                            이전
                        </div>
                        <div className={"diff_next"} onClick={() => {
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
export default 힘든점;
