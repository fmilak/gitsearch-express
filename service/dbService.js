var mysql = require("mysql");

var fetchUserByUsername = "SELECT * FROM user WHERE username = ?";
var fetchToken = "SELECT * FROM token";

module.exports = {
  init: function () {
    try {
      var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gitsearch",
      });
      connection.connect();

      return connection;
    } catch (e) {
      console.log(e);
    }
  },
  fetchUser: function (username, connection, callback) {
    connection.query(fetchUserByUsername, [username], (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      callback(rows);
    });
  },
  fetchToken: function (connection, callback) {
    connection.query(fetchToken, (err, rows, fields) => {
      if (err) {
        // some error occured
        console.log(err);
      } else {
        callback(rows);
      }
    });
  },
};
