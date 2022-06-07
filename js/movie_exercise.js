"use strict";
(function () {
    const URL = 'https://expensive-narrow-license.glitch.me/movies';
    //Function to get all movies
    let allMovies = () => fetch(URL).then(res => res.json());
    //Function to render movies
    let renderMovies = () => {
         allMovies().then((data) => {
             let movieCard = data.map(movie => {
                 return `<div>
                    <h3>Title: ${movie.title}</h3>
                    <h4>Director: ${movie.director}</h4>
                    <h4>Genre: ${movie.genre}</h4>
                    <h4>Rating${movie.rating}</h4>
                    </div>`
             })
             console.log(movieCard);
             $("#movies").html(movieCard);
         })

    };
    renderMovies();


}());