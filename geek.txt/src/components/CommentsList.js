import SingleComment from './SingleComment';

const CommentsList = ({ commentsList }) => {
    const getComments = () => {
        let comments = commentsList.map(function (comment) {
            return <SingleComment Creator={comment.CreatorName} Text={comment.Text} />;
        });
        return comments;
    }
    return (
        <div>
            <h2>What Geeks like you are saying...</h2>
            <ul>
                {getComments()}
            </ul>
        </div>
    )
}

export default CommentsList;