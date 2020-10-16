var dbPromised = idb.open("football-teams", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
});
function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}

function deleteTeam(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      console.log("Item deleted");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (articles) {
        resolve(articles);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function (team) {
        console.log(team);
        resolve(team);
        // console.log(team);
      });
  });
}
