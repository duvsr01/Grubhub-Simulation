//Create DB

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log("DB Creation Error" + err);
//     }
//     console.log(result);
//     res.send("Database created...");
//   });
// });

//create table
// app.get("/createpoststable", (req, res) => {
//   let sql =
//     "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Posts table created..");
//   });
// });

//Insert Post 1
// app.get("/addpost1", (req, res) => {
//   let post = { title: "Post One", body: "This is post number one" };
//   let sql = "INSERT INTO posts SET ?";
//   let query = db.query(sql, post, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send("Posts inserted..");
//   });
// });

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get("/", function(request, response) {
//   response.sendFile(path.join(__dirname + "/login.html"));
// });

//Allow Access Control
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });
