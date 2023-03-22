import connection from "../config/connectDb";

exports.getHomePage = async (req, res) => {
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    console.log(rows); // rows contains rows returned by server
    return res.render("home.ejs", { dataUser: rows });
  } catch (err) {
    console.log("ERROR", err);
  }

  /* cấu hình như ở trên là tối ưu hóa hiệu năng để người dùng khi tải lại trang
  sẽ k cần phải chọc xuống lấy database nhiều lần, không sử dụng callback*/

  // connection.query(
  //     'SELECT * FROM `users`',
  //     function(err, results, fields) {
  //       console.log(results); c
  //       return res.render('home.ejs', {dataUser: results});
  //     }
  //   );
};

exports.getDetailPage = async (req, res) => {
  try {
    let userId = req.params.userId;
    const [user, fields] = await connection.execute(
      "SELECT * FROM users where id = ?",
      [userId]
    );
    console.log(user);
    return res.render("detail.ejs", { detailUser: user });
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    let { firstName, lastName, email, address } = req.body; //Destructuring JS
    await connection.execute(
      "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, address]
    );
    return res.redirect("/home");
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let userId = req.body.userId;
    await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
    return res.redirect("/home");
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.editUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    const [user, field] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    return res.render("edit-user.ejs", { dataUser: user });
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let { firstName, lastName, email, address, userId } = req.body;
    await connection.execute(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?",
      [firstName, lastName, email, address, userId]
    );
    res.redirect("/home");
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.getUploadPage = (req, res) => {
  return res.render("uploadFile.ejs");
};

exports.uploadSingleFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    res.send("Please upload a file");
    // const error = new Error("Please upload a file");
    // // error.httpStatusCode = 400;
    // // return next(error);
  }
  res.send(
    `<h3>Upload file successfully </h3> <br> <a href= "/upload"> Upload other file </a> `
  );
};

exports.uploadMultipleFile = async (req, res) => {
  const files = req.files;
  if (!files) {
    res.send("Please upload a file");
    // const error = new Error("Please upload a file");
    // error.httpStatusCode = 400;
    // return next(error);
  }
  res.send(
    `<h3>Upload file successfully </h3> <br> <a href= "/upload"> Upload other file </a> `
  );
};

// module.exports = {
//   getHomePage,
//   getNewPage,
//   getDetailPage,
