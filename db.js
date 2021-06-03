const mysql = require('mysql')

dbConfig = {
    host: "mysql.j8693520.myjino.ru",
    user: "j8693520",
    password: "wn3AzY6t",
    port: 3306,
    database: "j8693520_demo"
}

let connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        return console.log("Ошибка: " + err)
    } else {
        console.log("Подключенте кайф")
    }
})
connection.on('error', function (err) {
    console.log('db error', err)
    console.log('reload')
    connection = mysql.createConnection(dbConfig);
})

// let test = "SELECT * FROM wy5ja_virtuemart_orders"
// connection.query(test, (err, result, field) => {
//     console.log(err)
//     console.log(result);
// })


module.exports = connection
