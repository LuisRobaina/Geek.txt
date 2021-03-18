import axios from 'axios';
import { useState } from 'react';
import { Button, Comment, TextArea } from 'semantic-ui-react';
import SingleComment from './SingleComment';

const CommentsList = ({ commentsList }) => {

    // State.
    const [CommentText, setComment] = useState("")
    return (
        <ul>
            {
                commentsList.map(function (comment) {
                    return <SingleComment Creator={comment.CreatorName} Text={comment.Text} />;
                })}
        </ul>
    )
}

export default CommentsList;