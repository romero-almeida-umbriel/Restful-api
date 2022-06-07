"use strict";
(function () {
    const URL = 'https://expensive-narrow-license.glitch.me/movies';
    //Function to get all movies
    let allMovies = () => fetch(URL).then(res => res.json());
    //Function to render movies
    let renderMovies = () => {
         allMovies().then((data) => {
             let movieCard = data.map(movie => {
                 return `<div class="col-2">
                    <h3>Title: ${movie.title}</h3>
                    <h4>Rating: ${movie.rating}</h4>
                    <button class="edit">Edit</button>
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
let movie1 = {
        id: 8,
        title: 'jimmyjohn'
}
    const editMovie = (movie) => {
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        }
        return fetch(`${URL}/${movie.id}`,options).then(resp => resp.json())
    }


    // All EVENT LISTENERS
    $('#addMovie').click(function(e) {
        e.preventDefault();
        let addNewMovie = {
            title: $('#movieTitle').val(),
            rating: $('#movieRating').val(),
        }
        addMovie(addNewMovie).then(renderMovies)
    });

    $('.edit').click(function() {
        $("#hiddenForm").css("visibility","visible")
    });


}());