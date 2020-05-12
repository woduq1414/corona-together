import React, {useEffect, useState} from "react";
import "../../styles/힘든점쓰기.css"

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const 힘든점쓰기 = props => {

    const [tagOption, setTagOption] = useState(props.tagList);
    const [selectedTag, setSelectedTag] = useState(tagOption[0])
    //setTagOption(['1', '2', '3'])
    const defaultOption = tagOption[0];

    return (
        <div className={"wd_container"}>
            <div className={"wd_header"}>
                <div className={"wd_title"}> 저는 </div>
                <Dropdown controlClassName='wd_dropdown' options={tagOption} onChange={(o)=>{setSelectedTag(o.label)}} value={selectedTag}
                             placeholder="Select an option"/>
                <div className={"wd_title"}> 입니다. </div>
            </div>
            <div className={"wd_content scroll"}>
                <div className={"wd_subtitle"}>{selectedTag}(으)로서 힘든 점은..</div>
                <div className={"wd_titleContainer"}>
                    {/*<label htmlFor={"wd_titleArea"} className={"wd_titleLabel"}>제목</label>*/}
                    <input placeholder="제목을 입력해주세요" id={"wd_titleArea"} className={"wd_titleArea"}/>
                </div>
                <div className={"wd_contentContainer"}>
                    {/*<label htmlFor={"wd_contentArea"} className={"wd_contentLabel"}>내용</label>*/}
                    <textarea placeholder="내용을 입력해주세요"  id={"wd_contentArea"} className={"wd_contentArea"}/>
                </div>


            </div>
        </div>


    );
};
//aa
export default 힘든점쓰기;
