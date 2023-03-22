import connection from "../config/connectDb";

exports.getAllUsers = async (req, res) => {
  try {
    const [user, filed] = await connection.execute("SELECT * FROM users");
    return res.status(200).json({
      message: "Ok",
      data: user,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};
exports.createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, address } = req.body; //Destructuring JS
    if (!firstName || !lastName || !email || !address) {
      return res.status(200).json({
        message: "Missing parameter",
      });
    }
    await connection.execute(
      "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, address]
    );
    return res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let userId = req.query.id;
    await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
    return res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
      return res.status(200).json({
        message: "Missing parameter",
      });
    }
    await connection.execute(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?",
      [firstName, lastName, email, address, id]
    );
    return res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

// module.exports = {
//   getAllUsers,
//   createUser,
// };
