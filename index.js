const API_URL = "http://localhost:3000/animes";

/* not sure why the ready and submit button are acting like this now since it was fine before
this is to  */
$(document).ready(function () {
    loadAnimes();

    $("#animeForm").submit(function (e) {
        e.preventDefault();
        let animeId = $("#animeId").val();
        if (animeId) {
            updateAnime(animeId);
        } else {
            addAnime();
        }
    });
});


/*------------------------ HTTP Verb: GET ------------------------*/
/*pulls out anime from the api/db.json to fill out the table to start it */

function loadAnimes() {
    $.get(API_URL, function (data) {
        let rows = "";
        data.forEach(anime => {
            rows += `<tr>
                    <td>${anime.id}</td>
                    <td>${anime.title}</td>
                    <td>${anime.totalEpisodes}</td>
                    <td>${anime.watchedEpisodes}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editAnime(${anime.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteAnime(${anime.id})">Delete</button>
                    </td>
                </tr>`;
        });
        $("#animesTableBody").html(rows);
    });
}

/*function to add an anime to the table, take/use the value given in the form 
and post it to the table with the rest of the animes listed */
function addAnime() {
    const anime = {
        title: $("#title").val(),
        totalEpisodes: $("#totalEpisodes").val(),
        watchedEpisodes: $("#watchedEpisodes").val()
    };
    $.post(API_URL, anime, function () {
        resetForm();
        loadAnimes();
    });
}

/*used to edit anime, by uploading what's on the table back to the form above, 
make changes, then submit which will update table */

function editAnime(id) {
    $.get(API_URL + "/" + id, function (anime) {
        $("#animeId").val(anime.id);
        $("#title").val(anime.title);
        $("#totalEpisodes").val(anime.totalEpisodes);
        $("#watchedEpisodes").val(anime.watchedEpisodes);
    });
}

/*------------------------ HTTP Verb: UPDATE ------------------------*/


function updateAnime(id) {
    const anime = {
        title: $("#title").val(),
        totalEpisodes: $("#totalEpisodes").val(),
        watchedEpisodes: $("#watchedEpisodes").val(),
    };
    $.ajax({
        url: API_URL + "/" + id,
        type: 'PUT',
        data: anime,
        success: function () {
            resetForm();
            loadAnimes();
        }
    });
}


/*------------------------ HTTP Verb: DELETE ------------------------*/

  
  
function deleteAnime(id) {
    $.ajax({
        url: API_URL + "/" + id,
        type: 'DELETE',
        success: function () {
            loadAnimes();
        }
    });
}

/* Resets the form when submit button is hit, clears out the boxes to add a new anime */
function resetForm() {
    $("#animeId").val("");
    $("#title").val("");
    $("#totalEpisodes").val("");
    $("#watchedEpisodes").val("");
}