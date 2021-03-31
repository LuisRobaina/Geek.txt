import SingleComment from './SingleComment';
import {Comment, Header, Statistic } from 'semantic-ui-react';
import { useState } from 'react';

const CommentsList = ({ commentsList }) => {
    const getComments = () => {
        let comments = commentsList.map(function (comment) {
            return <SingleComment CommentID={comment._id} Creator={comment.CreatorName} Text={comment.Text} Replies={comment.Replies} />;
        });
        return comments.reverse();
    }
    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Geeks like you are saying...
            </Header>
            <Statistic>
                <Statistic.Value>{commentsList.length}</Statistic.Value>
                <Statistic.Label>Comments</Statistic.Label>
            </Statistic>
            {getComments()}
        </Comment.Group>
    )
}

export default CommentsList;