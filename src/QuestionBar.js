import React from "react";

export default function QuestionBar(props){

    if(props.questions !== null) {
        return (
            <div className="QuestionBar mt-5">
                    {
                        props.questions.map((elem, index) => {
                            return (
                            <div className="message" key={index}>
                                {elem.text}
                            </div>)
                        })
                    }
                </div>
        )
    }
    else return (
        <div className="QuestionBar mt-5">
            No questions yet
        </div>
    )
}