var express = require("express");
var cors = require("cors");
var dbService = require("./service/dbService");
var app = express();

var connection = dbService.init();

const allowedOrigins = ["http://localhost:3000", "http://192.168.100.2:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/token", (req, res) => {
  const body = req.body;
  dbService.fetchUser(body.username, connection, (rows) => {
    const user = rows[0];
    if (user.password === body.password) {
      console.log("password match");
      dbService.fetchToken(connection, (rows) => {
        const token = rows[0];
        res.json({
          token: token.token,
        });
      });
    }
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
