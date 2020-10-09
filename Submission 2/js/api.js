// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getTeams(league) {
  fetch(`https://api.football-data.org/v2/competitions/${league}/teams`, {
    headers: {
      "X-Auth-Key": "3c95e145608a431f82cf8a3ac6f119ad",
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      let teamsHTML = "";
      data.teams.forEach((team) => {
        teamsHTML += `
            <a class="carousel-item" href="./detail.html?id=${team.id}">
            <img src="${team.crestUrl}"/>
            </a>
            `;
      });
      document.getElementById("teams-carousel").innerHTML = teamsHTML;
      initCarousel();
    })
    .catch(error);
}

function initCarousel() {
  const options = {
    dist: -80,
    numVisible: 7,
  };
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, options);
}
