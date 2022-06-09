"use strict";
(function () {

    //glitch url
    const URL = 'https://expensive-narrow-license.glitch.me/movies';
    //Function to get all movie objects information
    let allMovies = () => fetch(URL).then(res => res.json());
    let renderMovies = () => {
        allMovies().then(data => {
            let movieTitle = data.map(resp => {
                posterMovies(resp.id)
                return `<div class="col-3 movieCards">
                 
                 <div id="pic${resp.id}"></div>
                        
                        <button data-id=${resp.id} class="edit">Edit</button>
                        <button data-id=${resp.id} class="delete">Remove</button>
                        </div>`
            })


            $("#movies").html(movieTitle);
            editComplete();
            deleteMovies();
        })
    }

    setTimeout(renderMovies, 2000)

    let posterMovies = (id) => {
        allMovies().then((movie) => {
            movie = movie.filter(obj => obj.id + "" === `${id}`)
            movie = movie[0].title;
            const movieURL = `http://www.omdbapi.com/?i=tt3896198&apikey=43fb5106&t=${encodeURIComponent(movie)}`
            fetch(movieURL).then(res => res.json()).then(resp => {
                let movieTitle =
                    `<img class="m-1 p-1" src=${resp.Poster}>
                     <p>Genre: ${resp.Genre} ${resp.imdbRating}/10 </p>`

                $(`#pic${id}`).html(movieTitle)
            })


        })
    }


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
            console.log(e);
            let thisId = e.target.attributes[0].value;
            $("#hide").toggleClass("hiddenForm");
            $("#edit").click((e) => {
                e.preventDefault()
                let edit = {
                    id: parseFloat(thisId),
                    title: $("#popupTitle").val(),
                }
                editMovie(edit).then(renderMovies);
            })
        })
    }


}
());