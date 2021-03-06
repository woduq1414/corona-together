import React, {useEffect, useState, useRef} from "react";
import ReactDOM from "react-dom";

import 더보기 from "./modals/더보기";
import 응원쓰기 from "./modals/응원쓰기";
import 태그컨테이너 from "./태그컨테이너";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {WriteCheer, GetCheer, DeleteCheer} from "../api/Cheer";

const MySwal = withReactContent(Swal)


import "../styles/응원.css";
import {toast, ToastContainer} from "react-toastify";
import {DeleteDifficult, WriteDifficult} from "../api/Difficult";


let cheer = {
    "startIndex": 0, "data": [
        {"title": "제목1", "content": "내용1"},
    ]
};
toast.configure({})


const 응원 = props => {
    async function GetCheerHandler() {
        const res = await GetCheer({"tagName": props.tagList[props.tag]});
        switch (res.status) {
            case 200:

                props.setCheer({
                    "startIndex": 0, "data": res.data
                })
                break;
        }
    }

    const [limit, setLimit] = useState(2);

    const [toastFlag, setToastFlag] = useState({"f": 0, "message": ""});

    useEffect(() => {

        if (toastFlag.f == 0) return;

        toast.warning(toastFlag.message,
            {
                containerId: 'A',
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


    function prev() {
        let startIndex = cheer.startIndex;

        if (startIndex - limit < 0) {
            //startIndex = 0;
            setToastFlag({"f": 1, "message": "첫 페이지입니다."})
        } else {
            startIndex -= limit;
        }
        props.setCheer({"startIndex": startIndex, "data": [...cheer.data]})
    }

    function next() {
        let startIndex = cheer.startIndex;

        if (startIndex + limit >= cheer.data.length) {
            setToastFlag({"f": 1, "message": "마지막 페이지입니다."})
        } else {
            startIndex += limit;
        }

        props.setCheer({"startIndex": startIndex, "data": [...cheer.data]})
    }

    function showMore(cheer) {
        function deletePassConfirm() {
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
                async function DeleteCheerHandler(value) {

                    const res = await DeleteCheer(value);

                    switch (res.status) {
                        case 200:


                            GetCheerHandler();

                            MySwal.close()
                            MySwal.fire({
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
                value.seq = cheer.seq;
                console.log(value)
                DeleteCheerHandler(value)


            }
        }

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
            "footer": (
                <React.Fragment>
                    {cheer.password &&
                    <div className={"button more_deleteButton"}
                         onClick={() => {
                             MySwal.fire({
                                 title: "비밀번호를 입력해주세요.",
                                 html:
                                    <React.Fragment>

                                        <input autoFocus className={"pass_input"} onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                deletePassConfirm();
                                            }
                                        }}/>
                                    </React.Fragment>
                                ,
                                 footer:
                                     <React.Fragment>
                                         <div className={"button pass_confirmButton"} onClick={() => {
                                             deletePassConfirm();
                                         }}>확인
                                         </div>

                                     </React.Fragment>
                                 , "scrollbarPadding":
                                     false,
                                 "customClass": {
                                     "popup": "pass_modalContainer",
                                     "content": "pass_modalContent",
                                     "actions": 'pass_action',
                                     'confirmButton': 'button pass_exitButton',
                                     "footer": "pass_footer",
                                     "input": "pass_input"
                                 },
                                 "allowEnterKey": false
                             })
                         }}>삭제
                    </div>
                    }
                    {!cheer.password &&
                    <div>

                    </div>
                    }
                    <div className={"button more_confirmButton"}
                         onClick={() => {
                             MySwal.close()
                         }}>닫기
                    </div>
                </React.Fragment>
            ),

            "customClass": {
                "popup": "mc_content",
                "content": "more_modalContent",
                "actions": 'more_action',
                "footer": "more_footer",
                'confirmButton': 'button more_exitButton',
            },
            "scrollbarPadding": false
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
                <응원쓰기 tagList={props.tagList} colorIndex={Math.floor(Math.random() * 5)} tag={props.tag}/>
            ),
            "footer": (
                <React.Fragment>
                    {/*<ToastContainer/>*/}
                    <div className={"button wc_confirmButton"} onClick={() => {

                        const value = {
                            "tagName": document.querySelector('.wc_dropdown .is-selected').innerText,
                            "content": document.getElementById("wc_contentArea").value,
                            "color": document.querySelector('.wc_color.active').getAttribute('color')
                        }

                        let errors = [];
                        if (value.content.trim() == "") {
                            errors.push("내용이 비어있습니다.")
                        }
                        if (value.content.length > 2000) {
                            errors.push("내용은 2000자까지 가능합니다.")
                        }
                        if (value.color == "" || value.color == undefined) {
                            errors.push("포스트잇 색깔을 선택해주세요.")
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

                            async function WriteCheerHandler(value) {
                                MySwal.close()
                                const res = await WriteCheer(value);

                                switch (res.status) {
                                    case 201:
                                        if (value.tagName === props.tagList[props.tag]) {


                                            GetCheerHandler();
                                        }
                                        MySwal.close()
                                        MySwal.fire({
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
                                                {res.data.error.map((error, index) => {
                                                    return <p key={index}>{error}</p>
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

                            function passConfirm() {
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
                                    WriteCheerHandler(value)
                                }
                            }


                            MySwal.fire({
                                title: "비밀번호를 설정하실래요?",
                                html:
                                    <React.Fragment>
                                        <span style={{"text-align": "center"}}>비밀번호를 설정하면 추후 글을 삭제할 때 사용할 수 있어요.</span>
                                        <input autoFocus className={"pass_input"} onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                passConfirm();
                                            }
                                        }}/>
                                    </React.Fragment>
                                ,
                                footer: <React.Fragment>
                                    <div className={"button pass_confirmButton"} onClick={() => {
                                        passConfirm();
                                    }}>네
                                    </div>
                                    <div className={"button pass_confirmButton"} onClick={() => {
                                        WriteCheerHandler(value)
                                    }}>아니요
                                    </div>
                                </React.Fragment>
                                , "scrollbarPadding":
                                    false,
                                "customClass": {
                                    "popup": "pass_modalContainer",
                                    "content": "pass_modalContent",
                                    "actions": 'pass_action',
                                    'confirmButton': 'button pass_exitButton',
                                    "footer": "pass_footer",
                                    "input": "pass_input"
                                },
                                "allowEnterKey": false
                            })

                        }
                    }
                    }>확인
                    </div>
                </React.Fragment>

            ),
            "customClass": {
                "popup": "wc_modalContainer",
                "content": "wc_modalContent",
                "actions": 'wc_action',
                "footer": "wc_footer",
                'confirmButton': 'button wc_exitButton',
            },
            "showCancelButton": true,
            "reverseButtons": true,
            "scrollbarPadding": false
        })

    }


    console.log(props.cheer)
    cheer = props.cheer

    const mounted = useRef(false);

    // useEffect(() => {
    //
    //     try {
    //         // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    //         const el = document.getElementById('cheer_contents');
    //         const el2 = document.getElementById('cheer_contents').cloneNode(true);
    //         el.style.display = "none";
    //         el2.style.display = "flex";
    //         document.getElementsByClassName("cheer_contentContainer")[0].prepend(el2);
    //         const height = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().height;
    //         const width = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().width;
    //         el.style.display = "flex";
    //         document.getElementsByClassName("cheer_contentContainer")[0].removeChild(el2);
    //         //const height = document.getElementById('cheer_contents').getBoundingClientRect().height;
    //
    //         let oneHeight = document.getElementById("cheer_temp").getBoundingClientRect().height * 7 / 6;
    //         let oneWidth = document.getElementById("cheer_temp").getBoundingClientRect().width;
    //         document.getElementById("cheer_temp").remove();
    //
    //
    //         setLimit(Math.floor(height / oneHeight) * Math.floor(width / oneWidth));
    //         if (!mounted.current) mounted.current = true;
    //     } catch (e) {
    //
    //     }
    // }, [/*변경되는값*/]);

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

            let div = document.createElement('div');
            div.className = 'cheer_content';
            div.id = 'cheer_temp'
            let div2 = document.createElement('div');
            div2.className = 'cheer_contentText';
            div.append(div2)
            el2.prepend(div)

            //document.getElementsByClassName("cheer_contentContainer")[0].removeChild(el2);
            //const height = document.getElementById('cheer_contents').getBoundingClientRect().height;

            let oneHeight = document.getElementById("cheer_temp").getBoundingClientRect().height * 7 / 6;
            let oneWidth = document.getElementById("cheer_temp").getBoundingClientRect().width;

            document.getElementsByClassName("cheer_contentContainer")[0].removeChild(el2);


            setLimit(Math.floor(height / oneHeight) * Math.floor(width / oneWidth));
            if (!mounted.current) mounted.current = true;
        } catch (e) {

        }
    }, [props.debouncedSize]);


    // useEffect(() => {
    //    try {
    //             // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    //             const el = document.getElementById('cheer_contents');
    //             const el2 = document.getElementById('cheer_contents').cloneNode(true);
    //             el.style.display = "none";
    //             el2.style.display = "flex";
    //             document.getElementsByClassName("cheer_contentContainer")[0].prepend(el2);
    //             const height = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().height;
    //             const width = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().width;
    //             el.style.display = "flex";
    //             document.getElementsByClassName("cheer_contentContainer")[0].removeChild(el2);
    //             //const height = document.getElementById('cheer_contents').getBoundingClientRect().height;
    //
    //             let oneHeight = document.getElementsByClassName("cheer_content")[0].getBoundingClientRect().height * 7 / 6;
    //             let oneWidth = document.getElementsByClassName("cheer_content")[0].getBoundingClientRect().width;
    //
    //             setLimit(Math.floor(height / oneHeight) * Math.floor(width / oneWidth));
    //
    //         } catch (e) {
    //             const height = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().height;
    //             const width = document.getElementsByClassName('cheer_contents')[0].getBoundingClientRect().width;
    //
    //         }
    //
    // }, [props.debouncedSize]);


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
                    <div className={"button cheer_writeButton"} onClick={() => {
                        writeCheer()
                    }}>포스트잇 쓰기
                    </div>
                </div>

                <태그컨테이너 tag={props.tag} tagList={props.tagList} setTag={(e) => {
                    props.setTag(e)
                }}/>

                <div className={"cheer_contentContainer"}>
                    <div className={"cheer_contents"} id={"cheer_contents"}>
                        {/*<div className={"cheer_content"} id={"cheer_tem2"} style={{"display": "flex"}}>*/}
                        {/*    <div className="cheer_contentText">*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                        {cheer.data &&
                        cheer.data.slice(cheer.startIndex, cheer.startIndex + limit).map((cheer, index) => {
                            const colors = ["#85f07b", "#f9a5f5", "#a9f6f4", "#f1f29a", "#8aeec3"]

                            const color = cheer.color

                            return (

                                <div key={index} className={"cheer_content hvr-grow-rotate"} onClick={() => {
                                    showMore(cheer)
                                }}
                                     style={{
                                         "background-color": `${color}`
                                         // , "transform": `rotate(${Math.floor(Math.random() * 11 - 5)}deg)`
                                     }}
                                >
                                    {/*,"transform" : `rotate(${Math.floor(Math.random() * 11 - 5)}deg)`*/}
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


                    </div>

                    <div className={"cheer_footer"}>
                        <div className={"button cheer_prev"} onClick={() => {
                            prev()
                        }}>
                            이전
                        </div>
                        <div className={"button cheer_next"} onClick={() => {
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
