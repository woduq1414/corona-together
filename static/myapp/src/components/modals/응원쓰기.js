import React, {useEffect, useState} from "react";
import "../../styles/응원쓰기.css"

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import TextareaAutosize from 'react-autosize-textarea';


const 응원쓰기 = props => {
    const [color, setColor] = useState("#f1f29a");
    const [tagOption, setTagOption] = useState(props.tagList);
    const [selectedTag, setSelectedTag] = useState(tagOption[0])
    //setTagOption(['1', '2', '3'])
    const defaultOption = tagOption[0];
    const colors = ["#85f07b", "#f9a5f5", "#a9f6f4", "#f1f29a", "#8aeec3"]

    return (
        <div className={"wc_container"}>
            <div className={"wc_header"}>
                <Dropdown controlClassName='wc_dropdown' options={tagOption} onChange={(o) => {
                    setSelectedTag(o.label)
                }} value={selectedTag}
                          placeholder="Select an option"/>
                <div className={"wc_title"}>을 위한 응원 포스트잇</div>
            </div>
            <div className={"wc_content scroll"}>

                <div className={"wc_contentContainer"}>


                    <div className={"wc_noteWrapper"} style={{
                        "background-color":
                            `${color}`
                    }}>


                        <TextareaAutosize
                            id={"wc_contentArea"} className={"wc_contentArea scroll"}
                            rows={5}
                            maxRows={8}
                            defaultValue={'예시'}
                            style={{
                                "background-image":
                                    `-webkit-linear-gradient(left, white 0, transparent 0), -webkit-linear-gradient(right, white 0, transparent 0),
                                                -webkit-linear-gradient(${color} 2.9rem, #aaa 2.9rem, #aaa 3rem, white 3rem)`
                            }}
                        />

                    </div>
                    <div className={"wc_colors"}>


                        {colors.map((col) => {
                            return (
                                <div className={`wc_color ${col == color ? "active" : ""}`} style={{"background-color": col}} onClick={()=>{setColor(col)}}>

                                </div>
                            )

                        })
                        }


                    </div>


                </div>
            </div>
        </div>

    );
}
            export default 응원쓰기;
