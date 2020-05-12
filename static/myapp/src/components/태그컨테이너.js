import React, {useEffect, useState} from "react";

import "../styles/태그컨테이너.css";
import 더보기 from "./modals/더보기";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const 태그 = props => {
    console.log(props.isActive);
    return (
        <div className={`tag_tag ${props.isActive ? "active" : ""}`} tagIndex={props.tagIndex} onClick={() => props.setTag(props.tagIndex)}>
            <div className={"tag_sharp"}>#</div>
            <div className={"tag_tagName"}>{props.tagName}</div>
        </div>
    )
}


const 태그컨테이너 = props => {

    function openSelectTag() {


        console.log(props.tagList);
        MySwal.fire({
            "html":
                <div className={"tag_tagWrapper"}>
                    {
                        props.tagList.length !== 0 &&
                        (
                            props.tagList.map((tagName, index) => {
                                let isActive = false;
                                if(props.tag == index){
                                    isActive = true;
                                }
                                return (
                                    <태그 setTag={(e) => {
                                        props.setTag(e)
                                    }} tagIndex={index} tagName={tagName}
                                    isActive ={isActive}/>
                                )


                            })
                        )
                    }
                </div>
            ,
            "customClass": {
                "popup": "tag_modalContainer",
                "content": "tag_modalContent",
                "actions": 'tag_footer',
                'confirmButton': 'tag_exitButton',
            }
        })




    }


    return (
        <div className={"tag_tagContainer"}>
            <div className={"tag_mobile"}>
                <div className={"tag_left"}>
                    <태그 tagIndex={props.tag} tagName={props.tagList[props.tag]} isActive={true} setTag={()=>{}} />
                </div>
                <div className={"tag_right"}>
                    <div className={"tag_selectButton"} onClick={() => {
                        openSelectTag()
                    }}>태그 선택
                    </div>
                </div>
            </div>

            <div className={"tag_desktop"}>
                {props.tagList.length !== 0 &&
                props.tagList.map((tagName, index) => {
                    return (
                        <태그 setTag={(e) => {
                            props.setTag(e)
                        }} tagIndex={index} tagName={tagName}/>
                    )
                })

                }
            </div>


        </div>

    );
};
//aa
export default 태그컨테이너;
