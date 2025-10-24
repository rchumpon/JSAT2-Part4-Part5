// File Q4.3_sortedArray.js
// Description: Sort the array in ascending order by Movie ID.
// Author: Roongroj Chumpon
// Date: 27/10/25
// Version: 1.0.0

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

// Create an array of 10 movie objects.
// Each movie has a unique movieID and the IDs are not sorted.
const movies = [
  {movieID: 5, title: "Harry Potter and the Order of the Phoenix", year: 2007, rating: 7.5},
  {movieID: 1, title: "Harry Potter and the Philosopher's Stone", year: 2001, rating: 7.7},
  {movieID: 7, title: "Harry Potter and the Deathly Hallows: Part 1", year: 2010, rating: 7.7},
  {movieID: 3, title: "Harry Potter and the Prisoner of Azkaban", year: 2004, rating:7.9},
  {movieID: 8, title: "Harry Potter and the Deathly Hallows: Part 2", year: 2011, rating: 8.1},
  {movieID: 10, title: "Fantastic Beasts: The Crimes of Grindelwald", year: 2018, rating: 6.5},
  {movieID: 2, title: "Harry Potter and the Chamber of Secrets", year: 2002, rating: 7.5},
  {movieID: 6, title: "Harry Potter and the Half-Blood Prince", year: 2009, rating: 7.6},
  {movieID: 9, title: "Fantastic Beasts and Where to Find Them", year: 2016, rating: 7.2},
  {movieID: 4, title: "Harry Potter and the Goblet of Fire", year: 2005, rating: 7.7}
];

// Sort the movies array based on movieID in ascending order.
// The sort() method compares two movie objects (a and b) at a time.
// If a.movieID is smaller, it returns a negative number, so a comes before b.
// if a.movieID is larger, it returns a positive number, so b comes before a.
// if both movieID values are equal, the order remains unchanged.
movies.sort(function (a, b) {
  return a.movieID - b.movieID
});
// Print the sorted array to the console.
console.table(movies);


