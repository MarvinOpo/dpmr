var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doh_dpmr'
});

exports.insert_hospital = function (req, res) {
    var sql = "INSERT INTO hospitals(hospital_code, hospital_name, hospital_address) VALUES (?,?,?)" +
        " ON DUPLICATE KEY UPDATE hospital_code='" + req.body.hospitalCode + "', hospital_address='" + req.body.hospitalAddress + "'";

    var values = [req.body.hospitalCode, req.body.hospitalName, req.body.hospitalAddress];

    connection.query(sql, values, function (err, result) {
        if (err) throw err;

        res.send("Successfully saved.");
    });
}

exports.insert_encounter = function (req, res) {

    var sql = "INSERT INTO hospital_encounter(hospital_code, month, year, upload_date, er_count, opd_count, adm_count, unique_index) VALUES (?,?,?,?,?,?,?,?)" +
        " ON DUPLICATE KEY UPDATE er_count='" + req.body.ER_COUNT + "', opd_count='" + req.body.OPD_COUNT + "', adm_count='" + req.body.ADM_COUNT +
        "', upload_date='" + req.body.uploadDate + "'";

    var values = [req.body.hospitalCode, req.body.month, req.body.year, req.body.uploadDate, req.body.ER_COUNT, req.body.OPD_COUNT, req.body.ADM_COUNT,
    req.body.hospitalCode + req.body.month + req.body.year];

    connection.query(sql, values, function (err, result) {
        if (err) throw err;

        res.send("Successfully saved.");
    });
}

exports.get_encounters = function (hospitalCode) {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT month, sum(er_count) as er_count, sum(opd_count) as opd_count, sum(adm_count) as adm_count FROM hospital_encounter";

        if (hospitalCode) {
            sql += " WHERE hospital_code = '" + hospitalCode + "'";
        }

        sql += " GROUP BY month";

        var er_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var opd_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var adm_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        connection.query(sql, function (err, result) {
            if (err) throw err;

            for (var i = 0; i < result.length; i++) {
                switch (result[i].month) {
                    case "Jan":
                        er_arr.splice(0, 1, result[i].er_count);
                        opd_arr.splice(0, 1, result[i].opd_count);
                        adm_arr.splice(0, 1, result[i].adm_count);
                        break;
                    case "Feb":
                        er_arr.splice(1, 1, result[i].er_count);
                        opd_arr.splice(1, 1, result[i].opd_count);
                        adm_arr.splice(1, 1, result[i].adm_count);
                        break;
                    case "Mar":
                        er_arr.splice(2, 1, result[i].er_count);
                        opd_arr.splice(2, 1, result[i].opd_count);
                        adm_arr.splice(2, 1, result[i].adm_count);
                        break;
                    case "Apr":
                        er_arr.splice(3, 1, result[i].er_count);
                        opd_arr.splice(3, 1, result[i].opd_count);
                        adm_arr.splice(3, 1, result[i].adm_count);
                        break;
                    case "May":
                        er_arr.splice(4, 1, result[i].er_count);
                        opd_arr.splice(4, 1, result[i].opd_count);
                        adm_arr.splice(4, 1, result[i].adm_count);
                        break;
                    case "Jun":
                        er_arr.splice(5, 1, result[i].er_count);
                        opd_arr.splice(5, 1, result[i].opd_count);
                        adm_arr.splice(5, 1, result[i].adm_count);
                        break;
                    case "Jul":
                        er_arr.splice(6, 1, result[i].er_count);
                        opd_arr.splice(6, 1, result[i].opd_count);
                        adm_arr.splice(6, 1, result[i].adm_count);
                        break;
                    case "Aug":
                        er_arr.splice(7, 1, result[i].er_count);
                        opd_arr.splice(7, 1, result[i].opd_count);
                        adm_arr.splice(7, 1, result[i].adm_count);
                        break;
                    case "Sep":
                        er_arr.splice(8, 1, result[i].er_count);
                        opd_arr.splice(8, 1, result[i].opd_count);
                        adm_arr.splice(8, 1, result[i].adm_count);
                        break;
                    case "Oct":
                        er_arr.splice(9, 1, result[i].er_count);
                        opd_arr.splice(9, 1, result[i].opd_count);
                        adm_arr.splice(9, 1, result[i].adm_count);
                        break;
                    case "Nov":
                        er_arr.splice(10, 1, result[i].er_count);
                        opd_arr.splice(10, 1, result[i].opd_count);
                        adm_arr.splice(10, 1, result[i].adm_count);
                        break;
                    case "Dec":
                        er_arr.splice(11, 1, result[i].er_count);
                        opd_arr.splice(11, 1, result[i].opd_count);
                        adm_arr.splice(11, 1, result[i].adm_count);
                        break;
                }

                if (i == result.length - 1) {
                    var data = {};

                    data['ER'] = { "data": er_arr };
                    data['OPD'] = { "data": opd_arr };
                    data['ADM'] = { "data": adm_arr };

                    resolve(data)
                    return
                }

            }

            reject(new Error("No contents"))
        });
    })
}

exports.get_hospitals = new Promise(function (resolve, reject) {
    var sql = "SELECT * FROM hospitals";

    connection.query(sql, function (err, result) {
        if (err) throw err;

        var hospitals = []

        for (var i = 0; i < result.length; i++) {
            hospitals[i] = result[i]

            if (i == result.length - 1) {
                resolve(hospitals)
                return
            }
        }

        reject(new Error("No contents"))
    })

})

exports.get_hospital_data = function (req, res) {

    var sql = "SELECT month, sum(er_count) as er_count, sum(opd_count) as opd_count, sum(adm_count) as adm_count FROM hospital_encounter";

    if (req.body.hospitalCode) {
        sql += " WHERE hospital_code = '" + req.body.hospitalCode + "'";
    }

    if (req.body.year != 'All time') {
        if (req.body.hospitalCode) {
            sql += " AND year = '" + req.body.year + "'";
        } else {
            sql += " WHERE year = '" + req.body.year + "'";
        }
    }

    sql += " GROUP BY month";

    var er_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var opd_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var adm_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    connection.query(sql, function (err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            switch (result[i].month) {
                case "Jan":
                    er_arr.splice(0, 1, result[i].er_count);
                    opd_arr.splice(0, 1, result[i].opd_count);
                    adm_arr.splice(0, 1, result[i].adm_count);
                    break;
                case "Feb":
                    er_arr.splice(1, 1, result[i].er_count);
                    opd_arr.splice(1, 1, result[i].opd_count);
                    adm_arr.splice(1, 1, result[i].adm_count);
                    break;
                case "Mar":
                    er_arr.splice(2, 1, result[i].er_count);
                    opd_arr.splice(2, 1, result[i].opd_count);
                    adm_arr.splice(2, 1, result[i].adm_count);
                    break;
                case "Apr":
                    er_arr.splice(3, 1, result[i].er_count);
                    opd_arr.splice(3, 1, result[i].opd_count);
                    adm_arr.splice(3, 1, result[i].adm_count);
                    break;
                case "May":
                    er_arr.splice(4, 1, result[i].er_count);
                    opd_arr.splice(4, 1, result[i].opd_count);
                    adm_arr.splice(4, 1, result[i].adm_count);
                    break;
                case "Jun":
                    er_arr.splice(5, 1, result[i].er_count);
                    opd_arr.splice(5, 1, result[i].opd_count);
                    adm_arr.splice(5, 1, result[i].adm_count);
                    break;
                case "Jul":
                    er_arr.splice(6, 1, result[i].er_count);
                    opd_arr.splice(6, 1, result[i].opd_count);
                    adm_arr.splice(6, 1, result[i].adm_count);
                    break;
                case "Aug":
                    er_arr.splice(7, 1, result[i].er_count);
                    opd_arr.splice(7, 1, result[i].opd_count);
                    adm_arr.splice(7, 1, result[i].adm_count);
                    break;
                case "Sep":
                    er_arr.splice(8, 1, result[i].er_count);
                    opd_arr.splice(8, 1, result[i].opd_count);
                    adm_arr.splice(8, 1, result[i].adm_count);
                    break;
                case "Oct":
                    er_arr.splice(9, 1, result[i].er_count);
                    opd_arr.splice(9, 1, result[i].opd_count);
                    adm_arr.splice(9, 1, result[i].adm_count);
                    break;
                case "Nov":
                    er_arr.splice(10, 1, result[i].er_count);
                    opd_arr.splice(10, 1, result[i].opd_count);
                    adm_arr.splice(10, 1, result[i].adm_count);
                    break;
                case "Dec":
                    er_arr.splice(11, 1, result[i].er_count);
                    opd_arr.splice(11, 1, result[i].opd_count);
                    adm_arr.splice(11, 1, result[i].adm_count);
                    break;
            }

            // if (i == result.length - 1) {
            //     var data = {};

            //     data['ER'] = { "data": er_arr };
            //     data['OPD'] = { "data": opd_arr };
            //     data['ADM'] = { "data": adm_arr };

            //     res.send(data);
            // }

        }

        var data = {};

        data['ER'] = { "data": er_arr };
        data['OPD'] = { "data": opd_arr };
        data['ADM'] = { "data": adm_arr };

        res.send(data);
    });
}