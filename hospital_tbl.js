let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doh_dpmr'
});
  
// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  let createTableEncounter = `create table if not exists hospitals(
                          id int primary key auto_increment,
                          hospital_code varchar(20) not null,
                          hospital_name varchar(50) not null,
                          hospital_address varchar(100) not null
                      )`;
  
  connection.query(createTableEncounter, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
 
  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
}); 