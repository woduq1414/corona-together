import React, {useEffect, useState} from "react";
import "../../styles/더보기.css"

const 더보기 = props => {

    const diff = props.diff

    return (
        <div className={"more_container"}>
            <div className={"more_title"}>
                {diff.title}
            </div>
            <div className={"more_content scroll"}>
                {diff.content}
            </div>
        </div>


    );
};
//aa
export default 더보기;
