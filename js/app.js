$(document).ready(function() {
  $("form").submit(function (evt){
    // prevent loading another page while submitting the form
    evt.preventDefault();
    var searchText = $("#search").val();
    var omdbAPI = "http://www.omdbapi.com/?";
    var movie = searchText;
    var omdbOptions = {
      s: movie,
    }
    function displayPhotos(data) {
      var movieHtml = ""
      if (data.Response === "False") {
        movieHtml = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchText + ".</li>"
      } else (
          $.each(data.Search, function (i, movie) {
            movieHtml += '<li><div class="poster-wrap">';
            if (movie.Poster === "N/A") {
              movieHtml += '<i class="material-icons poster-placeholder">crop_original</i>';
            } else { movieHtml += '<img class="movie-poster" src=" ' + movie.Poster + ' ">';
            }
            movieHtml += '</div>';
            movieHtml += '<span class="movie-title">';
            movieHtml += movie.Title;
            movieHtml += '</span><span class="movie-year">';
            movieHtml += movie.Year;
            movieHtml += '</span></li>';
          }) // end each
        );
      $("#movies").html(movieHtml)
    }
    $.getJSON(omdbAPI, omdbOptions, displayPhotos)

  }) // end click

}); // end ready
