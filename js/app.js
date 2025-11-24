const movies = [
    new MyMovie(1, "Harry Potter and the Philosopher's Stone", 2001, 7.7),
    new MyMovie(2, "Harry Potter and the Chamber of Secrets", 2002, 7.5),
    new MyMovie(3, "Harry Potter and the Prisoner of Azkaban", 2004, 7.9),
    new MyMovie(4, "Harry Potter and the Goblet of Fire", 2005, 7.7),
    new MyMovie(5, "Harry Potter and the Order of the Phoenix", 2007, 7.5),
    new MyMovie(6, "Harry Potter and the Half-Blood Prince", 2009,7.6),
    new MyMovie(7, "Harry Potter and the Deathly Hallows: Part 1", 2010, 7.7),
    new MyMovie(8, "Harry Potter and the Deathly Hallows: Part 2", 2011, 8.1),
    new MyMovie(9, "Fantastic Beasts and Where to Find Them", 2016, 7.2),
    new MyMovie(10, "Fantastic Beasts: The Crimes of Grindelwald", 2018, 6.5),
    new MyMovie(11, "Fantastic Beasts: The Secrets of Dumbledore", 2022, 6.2),
    new MyMovie(12, "The Chronicles of Narnia: The Lion, the witch and the Wardrobe", 2005, 6.9),
  ];

// Create a new MovieList instance
let movieList = new MovieList('list', movies);
// Initial rendering
movieList.genMovieList();

// Search movie by Title
function searchClick() {
  // Get the search element from the DOM
  let formElements = document.getElementById('form-list-control').elements;
  // Getting the text from the input element
  let text = formElements['search-string'].value;
  // Filter the movies using the text
  const filtered = movieList.movieList.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
  // Render the filtered movies
  movieList.genMovieSearchList(filtered);
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
  movieList.genMovieSearchList(filtered);

}

// Refresh the movie list and clear inputs
function refreshClick() {
  // Get the form element
  let formElements = document.getElementById("form-list-control");
  // Clear all input fields in the form
  formElements.reset(); // reset() is built for HTML forms.
  // Re-render full movie list
  movieList.genMovieList();
}

// Sorting
function a2zClick() {
  movieList.sortA2Z();
  movieList.genMovieList();
}

function z2aClick() {
  movieList.sortZ2A();
  movieList.genMovieList();
}

function sortRatingClick() {
  movieList.sortRating();
  movieList.genMovieList();
}

// Keep a copy of the original list
const originalMovies = [...movies]; // make a copy of the initial array

// New refresh function
function refreshMovieList() {
  // Restore the movieList to its original order
  movieList.movieList = [...originalMovies];
  // Re-render the movie list
  movieList.genMovieList();
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
  movieList.genMovieList();
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
  movieList.genMovieList();
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
  movieList.genMovieList();
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
// document.getElementById('defaultOpen').click();

// Footer - get Date and inject into the footer
// Get the span from the dom to inject the date into
const dateSpan = document.getElementById('date')
// Get the current date
const theDate = new Date();
// Add the date to the dom
dateSpan.textContent = theDate.getFullYear();
