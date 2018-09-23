import React from 'react'
import StarRatings from 'react-star-ratings'

const MovieCard = (props) => {
    let linkstring = `https://www.imdb.com/title/${props.imdbID}/`
    return (
        <div className="row">
            <div className="col-lg-6 col-sm-7"><blockquote className="blockquote bq-primary">

                <div className="d-flex justify-content-between">
                    <div>
                        <h1 id="textarea-title" className="bq-title">{props.name}</h1>
                        <p id="textarea-subtitle" className="lead">{props.director}</p>
                    </div>
                    <div>
                        <h3 id="year" >{props.year}</h3>

                    </div>
                </div>
                <div>{props.type === "movie" ? <i className="type fas fa-film ml-2 mr-2  "> <span></span> </i> : <i className="type fas fa-tv ml-2 mr-2  "> <span></span> </i>}</div>
                <StarRatings
                    rating={parseInt(props.rating)}
                    starRatedColor="DarkGoldenRod"
                    starHoverColor="DarkGoldenRod"

                    numberOfStars={10}
                    name='rating'
                    starDimension="25px"
                    starSpacing="3px" />


                <p id="textarea-plot">{props.plot}</p>

            </blockquote>

            </div>
            <div className="col-lg-6 col-sm-5">
                <img className="img-responsive img-add" src={props.poster} alt="Card image cap" />

            </div>       </div>







    )
}





export default MovieCard
