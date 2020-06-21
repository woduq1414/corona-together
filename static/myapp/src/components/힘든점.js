import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import 더보기 from "./modals/더보기";
import 힘든점쓰기 from "./modals/힘든점쓰기";
import 태그컨테이너 from "./태그컨테이너";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const MySwal2 = withReactContent(Swal)
const MySwal3 = withReactContent(Swal)

import "../styles/힘든점.css";

import {GetDifficult, WriteDifficult, DeleteDifficult} from "../api/Difficult"


import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GetCheer} from "../api/Cheer";


let diff = {
    "startIndex": 0, "data": [
        {"title": "제목1", "content": "내용1"},
    ]
};

//toast.configure({})

const 힘든점 = props => {

    async function GetDifficultHandler() {
        const res = await GetDifficult({"tagName": props.tagList[props.tag]});
        //console.error(res.data)
        switch (res.status) {
            case 200:
                props.setDiff({
                    "startIndex": 0, "data": res.data
                })
                break;
        }
    }

    const [toastFlag, setToastFlag] = useState({"f": 0, "message": ""});

    useEffect(() => {

        if (toastFlag.f == 0) return;


        toast.warning(toastFlag.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            }
        );
        setToastFlag({"f": 0, "message": ""})

    }, [toastFlag.f]);


    const [limit, setLimit] = useState(2);

    function prev() {
        let startIndex = diff.startIndex;

        if (startIndex - limit < 0) {
            //startIndex = 0;
            setToastFlag({"f": 1, "message": "첫 페이지입니다."})
        } else {
            startIndex -= limit;
        }
        props.setDiff({"startIndex": startIndex, "data": [...diff.data]})
    }

    function next() {
        let startIndex = diff.startIndex;

        if (startIndex + limit >= diff.data.length) {
            setToastFlag({"f": 1, "message": "마지막 페이지입니다."})
        } else {
            startIndex += limit;
        }

        props.setDiff({"startIndex": startIndex, "data": [...diff.data]})
    }

    function showMore(diff) {

        MySwal.fire({
            "html": (
                <더보기 diff={diff}/>
            ),
            "footer": (
                <React.Fragment>
                    {diff.password &&
                    <div className={"more_deleteButton"}
                         onClick={() => {
                             MySwal.fire({
                                 title: "비밀번호를 입력해주세요.",
                                 input: "text",
                                 footer:
                                     <React.Fragment>
                                         <div className={"pass_confirmButton"} onClick={() => {
                                             const password = document.getElementsByClassName("pass_input")[0].value
                                             if (password.trim() == "") {
                                                 toast.error(
                                                     "비밀번호를 입력해주세요."
                                                     , {
                                                         position: "top-right",
                                                         autoClose: 5000,
                                                         hideProgressBar: false,
                                                         closeOnClick: true,
                                                         pauseOnHover: true,
                                                         draggable: true,
                                                         progress: undefined,
                                                     });


                                             } else {
                                                 async function DeleteDifficultHandler(value) {

                                                     const res = await DeleteDifficult(value);

                                                     switch (res.status) {
                                                         case 200:


                                                             GetDifficultHandler();

                                                             MySwal.close()
                                                             MySwal3.fire({
                                                                 title: "성공적으로 삭제되었습니다!",
                                                                 icon: 'success',
                                                                 "scrollbarPadding": false,
                                                                 "showConfirmButton": false
                                                             });


                                                             break;
                                                         case 403:
                                                         case 404:
                                                             console.log(res.data.error)
                                                             toast.error(
                                                                 res.data.error

                                                                 , {
                                                                     position: "top-right",
                                                                     autoClose: 3000,
                                                                     hideProgressBar: false,
                                                                     closeOnClick: true,
                                                                     pauseOnHover: true,
                                                                     draggable: true,
                                                                     progress: undefined,
                                                                 });
                                                             break;
                                                     }

                                                     //alert(res.data)
                                                 }

                                                 let value = {};
                                                 value.password = password;
                                                 value.seq = diff.seq;
                                                 console.log(value)
                                                 DeleteDifficultHandler(value)


                                             }
                                         }}>확인
                                         </div>

                                     </React.Fragment>
                                 , "scrollbarPadding":
                                     false,
                                 "customClass": {
                                     "popup": "pass_modalContainer",
                                     "content": "pass_modalContent",
                                     "actions": 'pass_action',
                                     'confirmButton': 'pass_exitButton',
                                     "footer": "pass_footer",
                                     "input": "pass_input"
                                 },
                                 "allowEnterKey": false
                             })
                         }}>삭제
                    </div>
                    }
                    {!diff.password &&
                    <div>

                    </div>
                    }
                    <div className={"more_confirmButton"}
                         onClick={() => {
                             MySwal.close()
                         }}>닫기
                    </div>
                </React.Fragment>
            ),
            "customClass": {
                "popup": "more_modalContainer",
                "content": "more_modalContent",
                "actions": 'more_action',
                "footer": "more_footer",
                'confirmButton': 'more_exitButton',
            },
            "scrollbarPadding": false
        })

    }

    function writeDiff() {

        MySwal.fire({
            "html": (
                <React.Fragment>
                    <힘든점쓰기 tagList={props.tagList} tag={props.tag}/>
                </React.Fragment>


            ),
            "footer": (
                <React.Fragment>
                    {/*<ToastContainer/>*/}
                    <div className={"wd_confirmButton"} onClick={() => {


                        const value = {
                            "tagName": document.querySelector('.wd_dropdown .is-selected').innerText,
                            "title": document.getElementById("wd_titleArea").value,
                            "content": document.getElementById("wd_contentArea").value
                        }
                        let errors = [];
                        if (value.title.trim() == "") {
                            errors.push("제목이 비어있습니다.")
                        }
                        if (value.title.length > 100) {
                            errors.push("제목은 100자까지 가능합니다.")
                        }
                        if (value.content.trim() == "") {
                            errors.push("내용이 비어있습니다.")
                        }
                        if (value.content.length > 2000) {
                            errors.push("내용은 2000자까지 가능합니다.")
                        }
                        console.log("SAFD", errors, value)
                        if (errors.length > 0) {
                            toast.error(
                                <div>
                                    {errors.map((error) => {
                                        return <p>{error}</p>
                                    })
                                    }
                                </div>

                                , {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });

                        } else {

                            async function WriteDifficultHandler(value) {
                                MySwal.close()
                                const res = await WriteDifficult(value);

                                switch (res.status) {
                                    case 201:
                                        if (value.tagName === props.tagList[props.tag]) {


                                            GetDifficultHandler();
                                        }
                                        MySwal.close()
                                        MySwal3.fire({
                                            title: "정상적으로 등록되었습니다!",
                                            icon: 'success',
                                            "scrollbarPadding": false,
                                            "showConfirmButton": false
                                        });





                                        break;
                                    case 400:
                                        console.log(res.data.error)
                                        toast.error(
                                            <div>
                                                {res.data.error.map((error) => {
                                                    return <p>{error}</p>
                                                })
                                                }
                                            </div>

                                            , {
                                                position: "top-right",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        break;
                                }

                                //alert(res.data)
                            }

                            MySwal.close()
                            MySwal.fire({
                                title: "비밀번호를 설정하실래요?",
                                text: "비밀번호를 설정하면 추후 글을 삭제할 때 사용할 수 있어요.",
                                input: "text",
                                footer: <React.Fragment>
                                    <div className={"pass_confirmButton"} onClick={() => {
                                        const password = document.getElementsByClassName("pass_input")[0].value
                                        if (password.trim() == "") {
                                            toast.error(
                                                "비밀번호를 입력해주세요."
                                                , {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                });


                                        } else {
                                            value.password = password
                                            WriteDifficultHandler(value)
                                        }
                                    }}>네
                                    </div>
                                    <div className={"pass_confirmButton"} onClick={() => {
                                        WriteDifficultHandler(value)
                                    }}>아니요
                                    </div>
                                </React.Fragment>
                                , "scrollbarPadding":
                                    false,
                                "customClass": {
                                    "popup": "pass_modalContainer",
                                    "content": "pass_modalContent",
                                    "actions": 'pass_action',
                                    'confirmButton': 'pass_exitButton',
                                    "footer": "pass_footer",
                                    "input": "pass_input"
                                },
                                "allowEnterKey" : false
                            })

                        }

                    }


                    }>확인
                    </div>
                </React.Fragment>

            ),
            "customClass": {
                "popup": "wd_modalContainer",
                "content": "wd_modalContent",
                "actions": 'wd_action',
                'confirmButton': 'wd_exitButton',
                "footer": "wd_footer"
            },
            "showCancelButton": true,
            "reverseButtons": true,
            "scrollbarPadding": false,
            onOpen: () => {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
            },

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

            let div = document.createElement('div');

            let div2 = document.createElement('div');
            div2.className = 'diff_content';
            div2.id = 'diff_temp'
            div.append(div2)
            el2.prepend(div)


            //const height = document.getElementById('diff_contents').getBoundingClientRect().height;

            const oneHeight = document.getElementById("diff_temp").getBoundingClientRect().height * 4 / 3;
            document.getElementsByClassName("diff_contentContainer")[0].removeChild(el2);
            // document.getElementsByClassName("diff_contents")[0].remove();

            setLimit(Math.floor(height / oneHeight))
            console.log(Math.floor(height / oneHeight))
        } catch (e) {

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
                                    <div className={"diff_content hvr-grow"}>
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
