var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql2"); //追加

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

//CORSミドルウェアの使用
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//db接続
const connection = mysql.createConnection({
  host: "db", // MySQLサーバーのホスト名
  user: "username", // MySQLユーザー名
  password: "password", // MySQLパスワード
  database: "appname", // データベース名
});

connection.connect((err) => {
  try {
    console.log("Connected to MySQL!!!!");
  } catch (err) {
    console.error("Error connecting to MySQL!!:", err);
    return;
  }
});

//ユーザーテーブルの内容をブラウザへ表示(GET処理)
app.get("/", (req, res) => {
  const sql = "select * from users";

  connection.query(sql, (err, result, fields) => {
    try {
      res.send(result);
    } catch (err) {
      console("Browser Error!!");
    }
  });
});

//データ追加（POST処理）
app.post("/", (req, res) => {
  const { name, email } = req.body;

  const sql = `INSERT INTO appname.users(name, email) VALUES("${name}","${email}");`;

  connection.query(sql, (err, result) => {
    try {
      res.status(201).send(`POST SUCCESS!!`);
    } catch (err) {
      console("POST ERROR!!", err);
    }
  });
});

//データの削除(DELETE処理)
app.delete("/delete/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id=?`;
  connection.query(sql, [req.params.id], (err, result, fields) => {
    try {
      console.log("DELETE SUCCESS!!", result);
      res.redirect("/");
    } catch (err) {
      console.log("DELETE ERROR!!", err);
    }
  });
});

//データのアップデート(UPDATE処理)
app.patch("/update/:id", async (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  connection.query(sql, req.body, (err, result, fields) => {
    try {
      console.log("UPDATE SUCCESS!!", result);
    } catch (err) {
      console("UPDATE ERROR!!", err);
    }
    res.redirect("/");
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
