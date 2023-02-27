function getMovies() {
	return fetch('http://localhost:3000/movies').then(
		response => {
			if (response.status == 200) {
				return response.json();
			}
			else if (response.status == 404) {
				return Promise.reject(new Error('Invalid URL'))
			}
			else if (response.status == 401) {
				return Promise.reject(new Error('UnAuthorized User...'));
			}
			else {
				return Promise.reject(new Error('Internal Server Error'));
			}
		}).then(moviesListResponse => {
			moviesList = moviesListResponse;
			showMoviesList(moviesList);
			return moviesListResponse;
		})

} 
function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(response => {
		if (response.status == 200) {
			return response.json();
		}
		else if (response.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (response.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Internal Server Error'));
		}
	}).then(favMoviesRes => {
		favMovies = favMoviesRes;
		showFavouritesMovies(favMovies);
		return favMoviesRes;
	})

} 
function addFavourite(id) {
	let movieName = moviesList.find(movie => {
		if (movie.id == id) {
			return movie;
		}
	});
	let favExists = favMovies.find(favMovie => {
		if (favMovie.id == movieName.id) {
			return favMovie;
		}
	});
	if (favExists) {
		return Promise.reject(new Error('Movie is already added to favourites'));
	} else {
		return fetch(`http://localhost:3000/favourites`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(movieName)
		}
		).then(response => {
			if (response.status == 200) {
				return response.json();
			}
		}
		).then(addedMovie => {
			favMovies.push(addedMovie);
			showFavouritesMovies(favMovies);
			return favMovies;
		}
		)
	}
} 
function showMoviesList(result) {
	movies = ''
	result.map((item) => {
		movies +=
			`<div class="card" style = "width: 18rem;" >
				<img src=${item.posterPath} class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">${item.title}</h5>
						<a href="#" class="btn btn-primary" onclick='addFavourite(${item.id})'>Add To Favourites</a>
					</div>
				</div>
				`
	})
	document.getElementById("moviesList").innerHTML = movies;
} 
function showFavouritesMovies(result) {
	favouritesMovies = ''
	result.map((item) => {
		favouritesMovies +=
			`<div class="card" style = "width: 18rem;" >
			<img src=${item.posterPath} class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">${item.title}</h5>
				</div>
			</div>
			`
	})
	document.getElementById("favouritesList").innerHTML = favouritesMovies
}
module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution