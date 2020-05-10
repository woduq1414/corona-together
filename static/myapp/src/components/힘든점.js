import React, {useEffect, useState} from "react";

import "../styles/힘든점.css";

import useDebounce from "../lib/useDebounce";

import {withRouter} from "react-router-dom";

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


let diff = {
    "startIndex": 0, "data": [
        {"title": "제목1", "content": "내용1"},
    ]
};
const 힘든점 = props => {
    const size = useWindowSize();
    const debouncedHeight = useDebounce(size.height, 300);
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

    console.log(props.diff)
    diff = props.diff
    useEffect(() => {
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
        setLimit(Math.floor(height / 200))
        console.log(Math.floor(height / 200))

    }, [debouncedHeight]);


    return (
        <React.Fragment>
            <div className={"diff_container"}>

                <div className={"diff_title"}>이런 점이 힘들어요</div>
                <div className={"diff_tagContainer"}>

                    {props.tagList.length !== 0 &&
                    props.tagList.map((tagName, index) => {
                        return (
                            <div className={"diff_tag"} tagIndex={index} onClick={() => props.setTag(index)}>
                                <div className={"diff_sharp"}>#</div>
                                <div className={"diff_tagName"}>{tagName}</div>
                            </div>
                        )
                    })

                    }


                    {/*<div className={"diff_tag"} tagIndex={0} onClick={() => props.setTag(0)}>*/}
                    {/*    <div className={"diff_sharp"}>#</div>*/}
                    {/*    <div className={"diff_tagName"}>학생</div>*/}
                    {/*</div>*/}
                    {/*<div className={"diff_tag"} tagIndex={1} onClick={() => props.setTag(1)}>*/}
                    {/*    <div className={"diff_sharp"}>#</div>*/}
                    {/*    <div className={"diff_tagName"}>의료진</div>*/}
                    {/*</div>*/}
                    {/*<div className={"diff_tag"} tagIndex={2} onClick={() => props.setTag(2)}>*/}
                    {/*    <div className={"diff_sharp"}>#</div>*/}
                    {/*    <div className={"diff_tagName"}>학생</div>*/}
                    {/*</div>*/}


                </div>

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
                                        <div className={"diff_more"}>
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

            <div className={'icon-scroll'}></div>
        </React.Fragment>


    );
};
//aa
export default 힘든점;
