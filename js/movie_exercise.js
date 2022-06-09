"use strict";
(function () {

    //glitch url
    const URL = 'https://materialistic-joyous-cowl.glitch.me/movies';
    //Function to get all movie objects information
    const allMovies = () => fetch(URL).then(res => res.json());
    let insertId;
    let posterMovies = () => {
        allMovies().then((movie, movieId) => {
            movieId = movie.map(obj => obj.id)
            console.log(movieId);
            for (let id of movieId) {

            }
            movie = movie.map(obj => obj.title)
            console.log(movie);


            for (let mov of movie) {
                const movieURL = `http://www.omdbapi.com/?i=tt3896198&apikey=43fb5106&t=${encodeURIComponent(mov)}`
                fetch(movieURL).then(res => res.json()).then(res => {
                    console.log(res);
                    let movieTitle = `<div class="col-3 movieCards">
                    <div>
                      <img src=${res.Poster}>
                      </div>
                        <p>Genre: ${res.Genre}\n ${res.imdbRating}/10 </p>
                        
                        <button data-id=${insertId} class="edit">Edit</button>
                        <button data-id=${insertId} class="delete">Remove</button>
                        </div>`
                    if (res[0]) {
                        $("#movies").html(movieTitle)
                        editComplete();
                        deleteMovies();

                    } else
                    $("#movies").append(movieTitle);
                    editComplete();
                    deleteMovies();

                })

            }

            $("#movies>img").css("display", "none");
        });
    }


    setTimeout(posterMovies, 2000)




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
        addMovie(addNewMovie).then(posterMovies)
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
            console.log(e);
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


}());