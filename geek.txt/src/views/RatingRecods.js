import RatingCard from '../components/RatingCard';
import { Comment, Header, Segment, Statistic } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';

const RatingsRecord = (props) => {

    const [ratings, setRatings] = useState([])
    useEffect(() => {
        axios.get(`/rate/get/${props.match.params.id}`)
            .then(ratingsSet => {
                // TODO: remove this log.
                console.log(ratingsSet.data)
                let ratingsCards = ratingsSet.data.map(function (rating) {
                    return <RatingCard nick={rating.NickName} rating={rating.Rating} />;
                });
                setRatings(ratingsCards.reverse());
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Comment.Group>
            <Link to={`/books/${props.match.params.id}`}>
                <button class="ui labeled icon button">
                    <i class="left arrow icon"></i>
                    Back to book
                </button>
            </Link>
            <Header as='h3' dividing>
                These Geeks have rated this book:
            </Header>
            <Statistic>
                <Statistic.Value>{ratings.length}</Statistic.Value>
                <Statistic.Label>Ratings</Statistic.Label>
            </Statistic>
            <Segment>
                {ratings}
            </Segment>
        </Comment.Group>
    )
}

export default RatingsRecord;