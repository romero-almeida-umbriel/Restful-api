"use strict";
(function () {

    //glitch url
    const URL = 'https://materialistic-joyous-cowl.glitch.me/movies';
    //Function to get all movie objects information
    let allMovies = () => fetch(URL).then(res => res.json());
    //Function to render movies
    let renderMovies = () => {
        allMovies().then((data) => {
          return data.map(movie => movie.title);

        }).then(data => {
            let movieTitle = data.map(movie => {
                posterMovies(movie)
            })
            $("#movies").html(movieTitle);
            editComplete();
            deleteMovies();

        })


    };
    renderMovies();
    //Fetch "POST"
    const addMovie = (movieObj) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        }
        return fetch(URL, options).then(resp => resp.json())
    }
    //Fetch "PATCH"
    const editMovie = (movie) => {
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        }
        return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json())
    }
    //Fetch "DELETE"
    const deleteMovie = (movie) => {
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${URL}/${movie}`, options).then((data) => data.json())
    };


    // All EVENT LISTENERS
    $('#addMovie').click((e) => {
        e.preventDefault();
        let addNewMovie = {
            title: $('#movieTitle').val(),
            rating: $('#movieRating').val(),
        }
        addMovie(addNewMovie).then(renderMovies)
    });

    let deleteMovies = () => {
        $('.delete').click((e) => {
            e.preventDefault()
            let thisId = e.target.attributes[0].value;
            deleteMovie(thisId).then(renderMovies)
        });
    }

    let editComplete = () => {
        $(".edit").click((e) => {
            e.preventDefault();
            let thisId = e.target.attributes[0].value;
            $("#hide").toggleClass("hiddenForm");
            $("#edit").click((e) => {
                e.preventDefault()
                let edit = {
                    id: thisId,
                    title: $("#popupTitle").val(),
                    rating: $("#popupRating").val()
                }
                editMovie(edit).then(renderMovies);
            })
        })
    }

    // let sortRating = () => {
    //     allMovies().then((data) => {
    //         let newRatings = data
    //      console.log(newRatings);
                // .map(rate => console.log(rate));
            // newRatings = newRatings.sort((a, b) => a - b)


            // newRatings.map(movie => {
            //     return `<div class="col-2 movieCards">
            //         <h3>Title: ${movie.title}</h3>
            //         <h4>Rating: ${movie.rating}</h4>
            //         <button data-id=${movie.id} class="edit">Edit</button>
            //         <button data-id=${movie.id} class="delete">Remove</button>
            //         </div>`
            // })


        // })

    // }
    // sortRating();

    //movie poster api
    //Function to get all movie objects information
    let posterMovies = (movie) => {
        const movieURL = `http://www.omdbapi.com/?i=tt3896198&apikey=43fb5106&t=${encodeURIComponent(movie)}`
        fetch(movieURL).then(res => res.json()).then(res => {
            return `<div class="col-2 movieCards">
                    <h3>Title: ${res.Title}</h3>
                    <h4>Genre: ${res.Genre}</h4>
                    <h4>Rating: ${res.imdbRating}</h4>
                    <button data-id=${res.id} class="edit">Edit</button>
                    <button data-id=${res.id} class="delete">Remove</button>
                    </div>`

        })

    };

}());