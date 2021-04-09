import axios from '../config/axios';
import { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';

const SingleComment = ({ CommentID, Creator, Text, Replies }) => {

    // State.
    const [CommentText, setComment] = useState("")
    const [Reply, setReply] = useState(false)
    
    const loadReplies = () => {
        let replies = Replies.map(function (reply) {
            return (
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>{reply.Creator}</Comment.Author>
                        <Comment.Metadata>
                            <div>Just now</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{reply.Text}</p>
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            )
        });
        return replies.reverse();
    }
    const handleAddReply = () => {
        setReply(!Reply)
    }

    const getReplyBox = () => {
        return (
            <div>
                <Form.TextArea onChange={handleChange} value={CommentText} />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleReplyPost} />
            </div>
        )
    }
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const handleReplyPost = (e) => {
        e.preventDefault()
        // TODO: Add the creators ID once we get login running.
        const postObject = {
            OriginalCommentID: CommentID,
            Creator: "MyUser",
            Text: CommentText
        }
        axios.post('/comments/reply', postObject)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => alert(err))
    }

    return (
        <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{Creator}</Comment.Author>
                <Comment.Metadata>
                    <div>Just Now</div>
                </Comment.Metadata>
                <Comment.Text>
                    <p>{Text}</p>
                </Comment.Text>
                <Comment.Actions>
                    <a onClick={handleAddReply}>Reply</a>
                </Comment.Actions>
                <Form reply>
                    {Reply ? getReplyBox() : null}
                </Form>

            </Comment.Content>
            <Comment.Group>
                {/* Replies */}
                {loadReplies()}
            </Comment.Group>
            {/* end of comment */}
        </Comment>
    )
}
export default SingleComment;