$(document).ready(() =>
{
 $('#searchForm').on('submit',(e) => {
  let searchText = $('#searchText').val();
  getMovies(searchText);
  e.preventDefault();
 });
});
document.getElementById('movies').style.visibility='hidden';
function getMovies(searchText)
{
  document.getElementById('hideone').style.visibility='hidden';
  document.getElementById('movies').style.visibility='visible';
  axios.get('http://www.omdbapi.com/?apikey=8b68dc14&s='+searchText)
  .then((response) => {
    console.log(response);
  let movie=response.data.Search;
  let output='';
  $.each(movie, (index,movie)=>
{
  output+=`<div class="col-md-3">
<div class="well text-center">
<div id="hovereff">
<img src="${movie.Poster}" class="img-thumbnail" >
<h5>${movie.Title}</h5>
<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-outline-primary" href="#">Movie Details</a>
</div>
 </div>
  </div>
`;
});
$('#movies').html(output);
  })
  .catch((err) =>
  {
    console.log(err);
    console.log("err occurs");
  });
}
function movieSelected(id)
{
  sessionStorage.setItem('movieId',id);
  window.location='movie.html';
  return false;
}
function getMovie()
{
  let movieId=sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=8b68dc14&i='+movieId)
  .then((response) => {
    console.log(response);
    let movie=response.data;
    let output=`
   <div class="row">
   <div class="col-md-4">
   <img src="${movie.Poster}" class="img-thumbnail">
   </div>
   <div class="col-md-8">

    <h2>${movie.Title}</h2>
    <div id="hovereff2">
    <ul class="list-group">
    <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
    <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
    <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
    <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
    <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
    <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
    <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
    <li class="list-group-item"><strong>Year:</strong>${movie.Year}</li>
    </ul>
  </div>
   </div>
   </div>
   <br>
   <div class="row jumbotron">
   <div class="well">
   <h3 ><strong>Plot:</strong></h3>
   ${movie.Plot}
   <hr>
   <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-primary">View IMDB</a>
   <a href="index.html" class="btn btn-default">Go Back To Search</a>
    `;
    $('#movie').html(output);
})
  .catch((err) =>
  {
    console.log(err);
    console.log("err occurs");
  });
}
