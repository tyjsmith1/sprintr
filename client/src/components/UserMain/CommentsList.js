import React from "react";
import Comment from "./Comment";
import './Comment.css'

function CommentsList({ comments }) {
    return (
        <div className="comments-container">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

export default CommentsList