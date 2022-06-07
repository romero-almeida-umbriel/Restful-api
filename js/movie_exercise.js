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
                    <h4>Rating: ${movie.rating}</h4>
                    <button id="edit">Edit</button>
                    </div>`
             })
             console.log(movieCard);
             $("#movies").html(movieCard);
         })

    };
    renderMovies();

    const addMovie = (movieObj) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        }
        return fetch(URL, options).then(resp => resp.json()).then(result => console.log(result))
    }

    const editMovie = (movie) => {
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        }
        return fetch(`${URL}, ${options}`).then(resp => resp.json())
    }

    $('#addMovie').click(function(e) {
        e.preventDefault();
        let addNewMovie = {
            title: $('#movieTitle').val(),
            rating: $('#movieRating').val(),
        }
        addMovie(addNewMovie).then(resp => renderMovies())
    })

    $('#edit').click(function() {
        let editMovie = {

        }

    })


}());