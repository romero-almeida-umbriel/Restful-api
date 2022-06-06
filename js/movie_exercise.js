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
                    <h2>Title: ${movie.title}</h2>
                    <h3>Director: ${movie.director}</h3>
                    <h3>Genre: ${movie.genre}</h3>
                    <h3>Rating: ${movie.rating}</h3>
                    </div>`
             })
             console.log(movieCard);
             $("#movies").html(movieCard);
         })

    };
    renderMovies();


}());