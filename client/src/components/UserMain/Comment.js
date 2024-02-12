import React from "react";
import './Comment.css'

function Comment({ comment }){
    return (
        <div className="comment-bubble">
            <div className="comment-username">{comment.username}</div>
            <div className="comment-text">{comment.comment_text}</div>
        </div>
    )
}

export default Comment