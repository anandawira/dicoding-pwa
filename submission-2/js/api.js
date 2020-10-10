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
  if ("caches" in window) {
    caches
      .match(`https://api.football-data.org/v2/competitions/${league}/teams`)
      .then(function (response) {
        console.log("home", response);
        if (response) {
          response.json().then(function (data) {
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
          });
        } else {
          fetch(
            `https://api.football-data.org/v2/competitions/${league}/teams`,
            {
              method: "GET",
              headers: {
                "X-Auth-Token": "3c95e145608a431f82cf8a3ac6f119ad",
              },
            }
          )
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
      });
  }
}

function getTeamById(id) {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches
        .match(`https://api.football-data.org/v2/teams/${id}`)
        .then(function (response) {
          console.log("detail", response);
          if (response) {
            response.json().then(function (data) {
              let teamHTML = `
              <img src="${data.crestUrl}" alt="club-logo" />
              <h1>${data.name}</h1>
              <h5>Player List:</h5>
              <ul>`;

              data.squad.forEach((squad) => {
                if (squad.role == "PLAYER") {
                  teamHTML += `
                   <li>${squad.name} (${squad.position})</li>`;
                } else if (squad.role == "COACH") {
                  teamHTML += `
                  <li>${squad.name} (Coach)</li>`;
                }
              });

              teamHTML += `
              </ul>`;

              document.getElementById("body-content").innerHTML = teamHTML;

              resolve(data);
            });
          } else {
            fetch(`https://api.football-data.org/v2/teams/${id}`, {
              method: "GET",
              headers: {
                "X-Auth-Token": "3c95e145608a431f82cf8a3ac6f119ad",
              },
            })
              .then(status)
              .then(json)
              .then((data) => {
                let teamHTML = `
              <img src="${data.crestUrl}" alt="club-logo" />
              <h1>${data.name}</h1>
              <h5>Player List:</h5>
              <ul>`;

                data.squad.forEach((squad) => {
                  if (squad.role == "PLAYER") {
                    teamHTML += `
                    <li>${squad.name} (${squad.position})</li>`;
                  } else if (squad.role == "COACH") {
                    teamHTML += `
                    <li>${squad.name} (Coach)</li>`;
                  }
                });

                teamHTML += `
                </ul>`;

                document.getElementById("body-content").innerHTML = teamHTML;

                resolve(data);
              })
              .catch(() => {
                document.getElementById("body-content").innerHTML =
                  "<h1>Halaman tidak dapat ditampilkan.</h1>";
              });
          }
        });
    }
  });
}

function getSavedTeams() {
  getAll().then((teams) => {
    console.log(teams);

    let teamsHTML = "";

    if (teams.length === 0) {
      console.log("sadas");
      document.getElementById("title").innerText = "No Saved Teams";
    }

    teams.forEach((team) => {
      teamsHTML += `
            <a class="carousel-item" href="./detail.html?id=${team.id}&saved=true">
            <img src="${team.crestUrl}"/>
            </a>
            `;
    });

    document.getElementById("teams-carousel").innerHTML = teamsHTML;
    initCarousel();
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then((data) => {
    let teamHTML = `
        <img src="${data.crestUrl}" alt="club-logo" />
        <h1>${data.name}</h1>
        <h5>Player List:</h5>
        <ul>`;

    data.squad.forEach((squad) => {
      if (squad.role == "PLAYER") {
        teamHTML += `
            <li>${squad.name} (${squad.position})</li>`;
      } else if (squad.role == "COACH") {
        teamHTML += `
            <li>${squad.name} (Coach)</li>`;
      }
    });

    teamHTML += `
        </ul>`;

    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function initCarousel() {
  const options = {
    dist: -50,
    numVisible: 7,
    noWrap: true,
  };
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, options);
}
