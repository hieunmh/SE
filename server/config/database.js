const mysql = require("mysql");
const dtb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant",
});

dtb.connect((err) => {
  if (err) throw err;
  console.log("Connect to database successfully");

});

export default dtb;
