import axios from 'axios';
import { useState } from 'react';
import { Button, Comment, TextArea } from 'semantic-ui-react';

const SingleComment = ({ Creator, Text }) => {

    // State.
    const [CommentText, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const handleReplyPost = (e) => {
        e.preventDefault()
        // TODO: Add the creators ID once we get login running.
        const postObject = {
            Creator: "601d7b8e7e0708245caabc48",
            Text: CommentText
        }
        axios.post('/comments/reply', postObject)
    }
    return (
        <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{Creator}</Comment.Author>
                <Comment.Metadata>
                    <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>{Text}</Comment.Text>
                {/* Reply section */}
                <br></br>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentText}
                    placeholder={"Reply to " + Creator}
                />
                <Button positive
                    onClick={handleReplyPost}
                >Post Reply</Button>
            </Comment.Content>
        </Comment>
    )
}
export default SingleComment;