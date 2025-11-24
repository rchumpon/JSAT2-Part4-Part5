// Movie class
class MyMovie {
  constructor(id, title, year, rating) {
    this.id = id;         // Unique ID of the movie
    this.title = title;   // Movie title
    this.year = year;     // Release Year
    this.rating = rating; // Movie rating
  }
}

// Movie List Class
class MovieList {
    constructor(rootId, movieList) {
      // ID of the HTML container where movie cards will be displayed
      this.rootId = rootId; 
      // Array of myMovie object
      this.movieList = movieList;
    }
  
  // Methods
  // Create one movie card
  movieRow(index, movie) {
    // Get the parent element
    const rootElement = document.getElementById(this.rootId);
    // create a new div element for the movie card
    const card = document.createElement("div");
    // Add CSS class for styling
    card.classList.add("movie-card");

    // Insert movie data into the card
    card.innerHTML = `
      <h3>${index}. ${movie.title}</h3>
      <small>Year: ${movie.year}</small>
      <p class="rating">&#11088; ${movie.rating.toFixed(1)}</p>
    `;
    // Add the card to the container
    rootElement.appendChild(card);
  }
  // End movieRow method

  // Generate full movie list as cards
  genMovieList() {
    // Clear old content
    this.removeElements();
    // Get the HTML element where movie cards will be displayed
    if (this.movieList.length === 0) {
      document.getElementById(this.rootId).innerHTML = "<p>No movies found.</p>";
      return;
    }
    // Loop through the movie list and create cards
    for (let i = 0; i < this.movieList.length; i++) {
      let movie = this.movieList[i];
      console.log(movie);
      // Call the movieRow method to generate a card
      // Pass i + 1 so numbering starts at 1
      this.movieRow(i + 1, movie);
    }
  }
  // End genAnimeList method

  // Generate a filtered list (used by search)
  genMovieSearchList(list) {
    // Remove all elements (old movie list) from the display
    this.removeElements();
    if (list.length === 0) {
      document.getElementById(this.rootId).innerHTML = `<p class="no-movies"> &#127915; No movies found. &#127915;</p>`;
      return;
    }
    // Generate a new list, from the list which was passed through
    // Loop through filtered list and create cards
    for (let i = 0; i < list.length; i++) {
      // Retrieves the current movie object in the loop.
      let movie = list[i];
      // Numbering starts at 1
      this.movieRow(i + 1, movie);
    }
  }
  // End of genMovieSearchList(list) method

  // Remove all movie cards from the DOM
  removeElements() {
    // Get the parent container element
    const rootElement = document.getElementById(this.rootId);
    // Clear any existing movies before re-rendering
    rootElement.innerHTML = ""
  }

  // Refresh the list
  refresh() {
    // We want to remove all elements
    this.removeElements();
    // Generate the list to display
    this.genMovieList();
  }
  // End Refresh method

  // Adding a new movie
  add(index, title, year, rating) {
    // Add a new movie to the end of the list
    this.movieList.push({id: index, title: title, year: year, rating: rating});
    // Re-render the list
    this.refresh();
  }
  // End of add method
  
  // Update an existing movie
  update(index, title, year, rating) {
    this.movieList[index].title = title;
    this.movieList[index].year = year;
    this.movieList[index].rating = rating;
    // Refresh the list
    this.refresh();
  }
    // End an update method

    // Delete a movie method
  delete(index) {
      // Remove one item from our array
      // Note: we should validate the index here.
      // Test for out of bounds.
    this.movieList.splice(index, 1);
      // Refresh the list
    this.refresh();
  }
  // End of delete method

  // Sort
  // Sort A - Z
  // Compare 2 values, A will go before B
  // Sort in ascending order
  sortA2Z() {
    this.movieList.sort((a, b) => a.title.localeCompare(b.title));
    this.refresh();
  }

  // Sort Z -A
  // Sort in decending order
  sortZ2A() {
    this.movieList.sort(function (a, b) {
        return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

  // Sort movies by rating (highest to lowest)
  sortRating() {
    this.movieList.sort(function (a, b) {
      // Numerical sort
      return b.rating - a.rating; 
    });
    this.refresh();
  }

  // Search by partial title
  search(nameString) {
    // Create a new list to hold our search results
    let shortList = [];
    // Use a loop to check to see if the nameString is in the movie title
    for (let movie of this.movieList) {
      //  Check if the nameString is in movie.title
      if (movie.title.includes(nameString)) {
        // We add this movie to our shortlist
        shortList.push(movie);
      }
    }
    //Generate the list to display
    this.genMovieSearchList(shortList);
  }

  // Search by exact movie ID
  searchId(movieId) {
    const selectedId = this.movieList.filter(movie => movie.id === Number(movieId));
    this.genMovieSearchList(selectedId);
  }
}






