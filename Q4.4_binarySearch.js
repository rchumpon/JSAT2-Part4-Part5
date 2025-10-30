// File Q4.4_binarySearch.js
// Description: Implement a binary search.This function searches the input array for the input movie ID using selected searching algorithm.
// Author: Roongroj Chumpon
// Date: 30/10/25
// Version: 1.0.0

// Create array to search
// Define a class named MyMovie that represents a movie with four properties.
class MyMovie {
  // The constructor initializes the properties for each movie object.
  constructor(movieID, title, year, rating) {
    this.movieID = movieID;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

// Create an array of 10 movie objects (sorted by movieID).
const sortedMovies = [
  new MyMovie(1, "Harry Potter and the Philosopher's Stone", 2001, 7.7),
  new MyMovie(2, "Harry Potter and the Chamber of Secrets", 2002, 7.5),
  new MyMovie(3, "Harry Potter and the Prisoner of Azkaban", 2004, 7.9),
  new MyMovie(4, "Harry Potter and the Goblet of Fire", 2005, 7.7),
  new MyMovie(5, "Harry Potter and the Order of the Phoenix", 2007, 7.5),
  new MyMovie(6, "Harry Potter and the Half-Blood Prince", 2009,7.6),
  new MyMovie(7, "Harry Potter and the Deathly Hallows: Part 1", 2010, 7.7),
  new MyMovie(8, "Harry Potter and the Deathly Hallows: Part 2", 2011, 8.1),
  new MyMovie(9, "Fantastic Beasts and Where to Find Them", 2016, 7.2),
  new MyMovie(10, "Fantastic Beasts: The Crimes of Grindelwald", 2018, 6.5)
];
// Display the array in a table for easy viewing.
console.table(sortedMovies);

// Set the movieID we want to searching for.
const key = 15;
console.log(`Searching for movieID: ${key}`);

// Create the binarySearch function
// Parameters: 
// - array: array of movie objects sorted by movieID.
// - movieID: the ID of the movie to find.
// Return: the movie object if found, or null if not found.
function binarySearch(array, movieID){
  // Initialize the start and end pointers.
  let start = 0;
  let end = array.length - 1;

  // Loop through the array while the start does not meet the end.
  while (start <= end) {
    // Find the middle index.
    let mid = Math.floor((start + end) / 2);
    // Log the index being checked and its movieID.
    console.log(`Checking index ${mid}: movieID = ${array[mid].movieID}`);

    // Check if the middle element matches the movieID.
    if(array[mid].movieID === movieID) {
      // Return the movie object, not the index
      return array[mid];
    } else if (array[mid].movieID < movieID) {
      // If the middle movieID is smaller than the key, look at the right side of the array.
      start = mid + 1; 
    } else {
      // If the middle movieID is greater than the key, look at the left side of the array.
      end = mid - 1;
    }

  }
  // Return null if no movie is found.
  return null;
}

// Calling the function with 2 parameters.
const result = binarySearch(sortedMovies, key);
// Output our results
if (result === null) {
  console.log(`Movie ID ${key} was not found.`);
} else {
  console.log("Movie found: ");
  console.table(result);
}


