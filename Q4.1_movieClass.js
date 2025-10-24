// File Q4.1_movieClass.js
// Description: Define the movie class.
// Author: Roongroj Chumpon
// Date: 27/10/25
// Version: 1.0.0

// Define a class called MyMovie to represent a movie object.
class MyMovie {
  // The class has four initial properties.
  constructor(movieID, title, year, rating) {
    this.movieID = movieID;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
  
}
// Use the MyMovie class to create new objects.
const MyMovie1 = new MyMovie(1, "The Matrix", 1999, 8.7);
const MyMovie2 = new MyMovie(2, "The Matrix Reloaded", 2003, 7.2);
const MyMovie3 = new MyMovie(3, "The Matrix Revolutions", 2003, 6.7);

// Output to the console.
console.log(MyMovie1);
console.log(MyMovie2);
console.log(MyMovie3);