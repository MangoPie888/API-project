import React from "react";

const ReviewForm = ()=>{

    return (
        <>
         <form>
                <label forHtml="star">star</label>
                <select name="star" id="star">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">4</option>
                </select>
            </form>
        </>
    )

};



export default ReviewForm;