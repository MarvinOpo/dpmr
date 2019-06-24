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
 
  let createTableEncounter = `create table if not exists hospital_encounter(
                          id int primary key auto_increment,
                          hospital_code varchar(20) not null,
                          month varchar(15) not null,
                          year varchar(5) not null,
                          upload_date datetime,
                          er_count int not null,
                          opd_count int not null,
                          adm_count int not null,
                          unique_index varchar(50) not null
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