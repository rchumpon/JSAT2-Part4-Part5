const movies = [
  {id: 1, title: "Alita: Battle Angel", year: 2019, rating: 7.3 },
  {id: 2, title: "Bad Neighbours", year: 2014, rating: 6.3 },
  {id: 3, title: "Doctor Strange", year: 2016, rating: 7.5 },
  {id: 4, title: "Fast & Furious 6", year: 2013, rating: 7.0 },
  {id: 5, title: "Harry Potter and the Deathly Hallows: Part 2", year: 2011, rating: 8.1},
  {id: 6, title: "Mean Girls", year: 2004, rating: 7.1 },
  {id: 7, title: "The Girl with the Dragon Tattoo", year: 2009, rating: 7.8 },
  {id: 8, title: "John Wick: Chapter 3 - Parabellum", year: 2019, rating: 7.4 },
  {id: 9, title: "Spider Man: No Way Home", year: 2021, rating: 8.2 },
  {id: 10, title:"Resident Evil", year: 2002, rating: 6.6 },
  {id: 11, title:"The Bourne Ultimatum", year: 2007, rating: 8.0},
  {id: 12, title:"Kingsman: The Secret Service", year: 2014, rating: 7.7},
];
// Create a new MovieList object using the container with id = "list"
// and the movies array as the data source
let movieList = new MovieList('list', movies);
// Get the HTML element where movie cards will be displayed
const movieGrid = document.getElementById("list");

// Function to render movies as cards
// If no list is provided, it will use the main movie list by default
function renderMovies(list = movieList.movieList) {
  // Clear any existing movies before re-rendering
  movieGrid.innerHTML = ""; 
  // If no movies exist, display a message instead
  if (list.length === 0) {
    movieGrid.innerHTML = "<p>No movies found.</p>";
    return;
  }
    // Loop through the movie list and create a card for each movie
    list.forEach((movie, index) => {
    //  create a new div element to act as a movie card
    const card = document.createElement("div");
    // Add CSS class for styling
    card.classList.add("movie-card");
    // Insert movie data into the card
    // index + 1 is used to show numbering starting from 1
    card.innerHTML = `
      <h3>${index + 1}. ${movie.title}</h3>
      <small>Year: ${movie.year}</small>
      <p class="rating">&#11088; ${movie.rating.toFixed(1)}</p>
    `;
    // Add the card into the movie grid container
    movieGrid.appendChild(card);
  });
}

 // Initial render
renderMovies(); 


// Search movie by Title
function searchClick() {

  // Get the search element from the DOM
  let formElements = document.getElementById('form-list-control').elements;
  // Getting the text from the input element
  let text = formElements['search-string'].value;
  // Filter the movies using the text
  const filtered = movieList.movieList.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
  // Render the filtered movies
  renderMovies(filtered);
}

// Search movie by ID
function searchIdClick() {
  // Get all form elements from the form
  let formElements = document.getElementById('form-list-control').elements;
  // Get the ID input value and remove extra spaces
  let text = formElements['search-id'].value.trim(); // remove extra space

  // Filter the movies and convert ID to string to allow includes
  const filtered = movieList.movieList.filter(movie => movie.id.toString() === text);
  // Display the search results
  renderMovies(filtered);

}

// Refresh the movie list and clear inputs
function refreshClick() {
  // Get the form element
  let formElements = document.getElementById("form-list-control");
  // Clear all input fields in the form
  formElements.reset(); // reset() is built for HTML forms.
  // Re-render full movie list
  renderMovies(movieList.movieList);
}

// Sorting
function a2zClick() {
  movieList.sortA2Z();
  renderMovies(movieList.movieList);
}

function z2aClick() {
  movieList.sortZ2A();
  renderMovies(movieList.movieList);
}

function sortRatingClick() {
  movieList.sortRating();
  renderMovies(movieList.movieList);
}

// CRUD operations
// Create - Add
function addClick() {
  // Get the add form elements from the DOM
  let formElements = document.getElementById('form-add').elements;
  // Get the data from the form
  let index = formElements['index'].value;
  let title = formElements['title'].value;
  let year = formElements['year'].value;
  let rating = formElements['rating'].value;

  // Add in Validation
  if (!index || !title || !year || !rating) {
    alert("All fields are required. Please fill in every input.");
    // Stop here. Do not add the  movie.
    return;
  }
  // Extra validation: ensure year & rating are numbers
  if (isNaN(year) || isNaN(rating)) {
    alert("Year and Rating must be valid numbers.");
    return;
  }

  // Test the values of the input
  movieList.add(index, title, Number(year), Number(rating));
  // Clear the input fields
  formElements.index.value = "";
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.rating.value = "";
  // Refresh the movie list
  renderMovies(movieList.movieList);
}

// Update - Update
function updateClick() {
  // Get the update form elements from the DOM
  let formElements = document.getElementById('form-update').elements;
  // Get the data from the form
  let indexInput = formElements['index'].value;
  let title = formElements['title'].value;
  let year = formElements['year'].value;
  let rating = formElements['rating'].value;

  // Add in Validation

  // 1. Index must not be empty
  if (indexInput === "") {
    alert("Index is required.");
    return;
  }
  // Convert to number after checking empty
  let index = Number(indexInput);

  // 2. Index must be a valid number
  if (isNaN(index)) {
    alert("index must be a valid number.");
    return;
  }
  // 3. Index must be within the array bounds
  // Convert to zero-based index
  index = index - 1;
  // Index must exist in the movie list
  if (index < 0 || index >= movieList.movieList.length) {
    alert("Invalid index. Movie does not exist.");
    return;
  }
  // 4. Title, Year, and Rating must not be empty
  if (!title || !year || !rating) {
    alert("Title, Year, and Rating are required.");
    return;
  }
  // 5. Year and Rating must be numbers
  if (isNaN(year) || isNaN(rating)) {
    alert("Year and Rating must be valid numbers.");
    return;
  }

  // Test the index
  // Test the values of the input
  movieList.update(index, title, Number(year), Number(rating));
  // Clear the input fields
  formElements.index.value = "";
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.rating.value = "";
  // Refresh the movie list
  renderMovies(movieList.movieList);
}
// Delete - Delete
function deleteClick() {
  // Get the delete form elements from the DOM
  let indexElement = document.getElementById('delIndex');

  let indexInput = indexElement.value;
 
  // Add in Validation
  // 1. Input must not be empty
  if (indexInput === "") {
    alert("Please enter an index to delete.")
    return;
  }
  let index = Number(indexInput);
  // 2. Index must be a number
  if (isNaN(index)) {
    alert("Index must be a number.");
    return;
  }
  // 3. Index must be within the movie list range
  // Convert to zero-based index
  index = index - 1;
  if (index < 0 || index >= movieList.movieList.length) {
    alert("Invalid index. No movie exists at that position");
    return;
  }
  // Test the index
  // Test the values of the input
  movieList.delete(index);
  // Clear the input fields
  indexElement.value = "";
  // Refresh the display
  renderMovies(movieList.movieList);
}


// UI JavaScript
// JavaScript of Tabs
// Function openForm()
// Take in 2 parameters, an event and an action
// Returns nothing
function openForm(event, action) {
  // Declare variables
  let i, tabContent, tabLinks;

  // Get all elements that have the classname of tabcontent
  tabContent = document.getElementsByClassName('tabcontent');
  // Use a loop to set the display of all tabcontent elements to display = none.
  for (i = 0; i < tabContent.length; i++ ){
    tabContent[i].style.display = 'none';
  }

  // Get all elements with the class name of tablinks and remove the active class
  tabLinks = document.getElementsByClassName('tablinks');
  //remove the active class using a loop
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace("active", "") // tabLinks[i].classList.remove('active');
    // More robust for managing CSS classes
    // Avoids string manipulation and is the preferred approach today
  }

  // Hide all tab contents first...
  // Then show the one that matches 'action'
  // And make the element (Form) visible on the page
  document.getElementById(action).style.display = "block";
  // This adds the "active" class to the button that was clicked.
  // event.currentTarget refers to the element that triggered the event
  // In this case, it is the button you clicked.
  event.currentTarget.className += " active";
}
// End of openForm()

// Open a tab by default
document.getElementById('defaultOpen').click();

// Footer - get Date and inject into the footer
// Get the span from the dom to inject the date into
const dateSpan = document.getElementById('date')
// Get the current date
const theDate = new Date();
// Add the date to the dom
dateSpan.textContent = theDate.getFullYear();
