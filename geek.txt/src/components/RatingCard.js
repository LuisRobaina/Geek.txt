import {Rating} from "semantic-ui-react"

const RatingCard = ({ nick, rating }) => {
    return (
        <div>
            <a class="ui image label">
                {nick != "Anonymous" && <img src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'></img>}
                {nick == "Anonymous" && <img src='https://cdn.pixelprivacy.com/wp-content/uploads/2017/09/Incognito-1024x558.png'></img>}
                {nick}
            </a>
            <Rating icon="star" defaultRating={rating} maxRating={5} disabled key={rating} style={{ margin: '25px 0 ', fontSize: "18px" }} />
        </div>
    )
}

export default RatingCard;