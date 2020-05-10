import React, {useEffect, useState} from "react";

import "../styles/힘든점.css";


import {withRouter} from "react-router-dom";


const 응원 = props => {


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
                </div>

                <div className={"diff_contentContainer"}>
                    <div className={"diff_contents"}>
                        <div className={"diff_content"}>
                            <div className={"diff_contentTitle"}>
                                급식이 먹고 싶어요
                            </div>
                            <div className={"diff_contentText"}>
                                지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요
                                아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고
                                진짜 급식 언제 주냐고
                            </div>
                            <div className={"diff_more"}>
                                더 보기
                            </div>
                        </div>
                        <div className={"diff_content"}>
                            <div className={"diff_contentTitle"}>
                                급식이 먹고 싶어요
                            </div>
                            <div className={"diff_contentText"}>
                                지금 몇 달 째 학교 급식을 못 먹고 있는지 모르겠어요 떡갈비 마요덮밥 먹고 싶은데 학교를 못가고 있는 건데 어떡할 거냐고요
                                아 정말 개빡치네 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 아니 하 ㅠㅠ 급식 먹고 싶다 급식 먹고 싶다 급식 먹고싶다고
                                진짜 급식 언제 주냐고
                            </div>
                            <div className={"diff_more"}>
                                더 보기
                            </div>
                        </div>
                    </div>

                    <div className={"diff_footer"}>
                        <div className={"diff_prev"}>
                            이전
                        </div>
                        <div className={"diff_next"}>
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
export default 응원;
