var dbPromised = idb.open("football-teams", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "ID",
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false,
  });
});
function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("football-teams", "readwrite");
      var store = tx.objectStore("football-teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}

// function getAll() {
//   return new Promise(function (resolve, reject) {
//     dbPromised
//       .then(function (db) {
//         var tx = db.transaction("articles", "readonly");
//         var store = tx.objectStore("articles");
//         return store.getAll();
//       })
//       .then(function (articles) {
//         resolve(articles);
//       });
//   });
// }
