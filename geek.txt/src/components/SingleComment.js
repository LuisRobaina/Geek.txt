import axios from '../config/axios';
import { useState } from 'react';
import { Popup, Grid, Button, Comment, Form } from 'semantic-ui-react';

const SingleComment = ({ User, CommentID, Creator, Text, Replies }) => {

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
                <Popup
                    trigger={
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    }
                    flowing
                    hoverable
                >
                    <h4>We value privacy</h4>
                    <Grid centered divided columns={2}>
                        <Grid.Column textAlign="center">
                            <Button positive onClick={handleReplyPost}>
                                Show Nickname
                            </Button>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Button secondary onClick={handleAnonymousReply}>
                                Hide my name!
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
            </div>
        )
    }
    const handleChange = (e) => {
        e.preventDefault()
        setComment(e.currentTarget.value)
    }
    const handleReplyPost = (e) => {
        e.preventDefault()
        const postObject = {
            OriginalCommentID: CommentID,
            Creator: User.geekID,
            Text: CommentText
        }
        axios.post('/comments/reply', postObject)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => alert(err))
    }
    const handleAnonymousReply = (e) => {
        e.preventDefault()
        const postObject = {
            OriginalCommentID: CommentID,
            Creator: "Anonymous",
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