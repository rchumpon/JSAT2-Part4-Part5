class MovieList {
  constructor(rootId, movieArray) {
    this.rootId = rootId; // the html id of where the list is going
    this.movieList = movieArray // the array of the movie that we wish to display
    this.refresh();
  }

  // Methods
  // movieRow - generate one row from the array
  movieRow(index, title, year, rating) {
    // Get the parent element
    const rootElement = document.getElementById(this.rootId)

    // Creating the element for the DOM
    const row = document.createElement('div');
    const id = document.createElement('div')
    const nameDiv = document.createElement('div');
    const yearDiv = document.createElement('div');
    const rateDiv = document.createElement('div')
    
    // Add content
    id.textContent = `${index}.`;
    nameDiv.textContent = title;
    yearDiv.textContent = year;
    rateDiv.textContent = rating;

    // Add the class of row onto our row
    row.classList.add('row');

    // Append the elements to the row
    // Build row
    row.appendChild(id);
    row.appendChild(nameDiv);
    row.appendChild(yearDiv);
    row.appendChild(rateDiv);

    
    // Append the row to the Dom (root element)
    rootElement.appendChild(row);
  }
  // End movieRow method

  // Generate all rows in our movieList
  genMovieList() {
    // Loop through the movieList
    for (let i = 0; i < this.movieList.length; i++) {
      let movie = this.movieList[i];
      console.log(movie);
      // Call the movieRow method to generate a row
      this.movieRow(i + 1, movie.title, movie.year, movie.rating);
    }
  }
  // End genAnimeList method

  // Generate a movie list based on our search string
  genMovieSearchList(list) {
    // Remove all elements (old movie list) from the display
    this.removeElements();
    // Generate a new list, from the list which was passed through
    // Loop through every movie object in the array
    for (let i = 0; i < list.length; i++) {
      // Retrieves the current movie object in the loop.
      let movie = list[i];
      // Call the movieRow method to generate and display one row of movie information in the UI
      this.movieRow(i + 1, movie.title, movie.year, movie.rating);
    }
  }
  // End of genMovieSearchList(list) method

  // Remove all list elements from the DOM
  removeElements() {
    // Get the parent container element
    const rootElement = document.getElementById(this.rootId);

    // Get all the HTML elements with the class name of "row"
    const childNodes = document.getElementsByClassName('row');
    // childNodes is an array of htmlElements.
    // See how many children do we have?
    const len = childNodes.length - 1;
    // Loop through the childNodes and remove them from the DOM
    for (let i = len; i >= 0; i--) {
      // Pull out the last child
      const child = childNodes[i];
      // Remove this child from the DOM
      rootElement.removeChild(child);
    }
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
    this.refresh();
  }
  // End of add method
  
  // Update a movie
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
    this.movieList.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    }); 
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

  searchId(movieId) {
    
    let selectedId = [];

    for (let movie of this.movieList) {
      if (movie.id.includes(movieId)) {
        selectedId.push(movie);
      }
    }
    this.genMovieSearchList(shortList);
  }

  
}





