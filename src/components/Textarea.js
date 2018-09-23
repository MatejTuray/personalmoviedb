import React from 'react'
import StarRatings from 'react-star-ratings'
import moment from "moment"
const TextArea = (props) => {
    return (
        <div>
            <blockquote className="blockquote bq-primary">
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h1 id="textarea-title" className="bq-title">{props.name}</h1>
                            <p id="textarea-subtitle" className="lead">{props.director}</p>
                        </div>
                        <div>
                            <h3 id="year" >{props.year}</h3>

                        </div>
                    </div>
                    <div>{props.type === "movie" ? <i className="type fas fa-film mr-2"> <span></span> </i> : <i className="type fas fa-tv mr-2"> <span></span> </i>}</div>
                    <StarRatings
                        rating={(props.rating)}
                        starRatedColor="DarkGoldenRod"
                        starHoverColor="DarkGoldenRod"

                        numberOfStars={10}
                        name='rating'
                        starDimension="25px"
                        starSpacing="3px" />


                    <div className="userdata"><p className="datetowatch"><i className="user far fa-clock mr-2"></i>{moment(props.dateToWatch).format("DD/MM/YYYY")} <p className="note"> <i className="user far fa-comment-alt mr-2"></i>{props.note}</p></p>
                    </div>
                    <p id="textarea-plot">{props.plot}</p>


                </div>
            </blockquote>

        </div>

    )
}
export default TextArea