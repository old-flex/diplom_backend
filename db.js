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
        let timeoutJob = setInterval(async () => {
            await connection.query("SELECT 1")
        }, 60 * 1000 * 5)
    }
})
connection.on('error', async function (err) {
    console.log('db error', err)
    console.log('reload')
    connection = mysql.createConnection(dbConfig);
    await connection.query(`INSERT INTO j8693520_demo.wy5ja_messages_logs (logs, date) VALUES ('reloading', '${new Date()}')`)
    await connection.query("SELECT 1")


})

// let test = "SELECT * FROM wy5ja_virtuemart_orders"
// connection.query(test, (err, result, field) => {
//     console.log(err)
//     console.log(result);
// })


module.exports = connection
