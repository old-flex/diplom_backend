let chai = require("chai")
let chaiHttp = require("chai-http")
let server = "http://localhost:8080/api"
let should = chai.should()
const mysql = require('mysql')


chai.use(chaiHttp)


const dbConfig = {
    host: "mysql.j8693520.myjino.ru",
    user: "j8693520",
    password: "wn3AzY6t",
    port: 3306,
    database: "j8693520_demo"
}

let connection = mysql.createConnection(dbConfig);

describe('Проверка работоспособности сервера', () => {
    it("Должен вернуть 'Server is ready'", (done) => {
        chai.request(server)
            .get('/health')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done();
            })
    })
});

describe('Отправка серверу запроса на изменение статуса заказа', () => {

    before(() => {
        return new Promise((resolve) => {
            connection.query(`UPDATE j8693520_demo.wy5ja_virtuemart_orders t SET t.order_status = 'P' WHERE t.virtuemart_order_id = 2`)
            resolve();
        })
    })

    after(function () {
        return new Promise((resolve) => {
            connection.end()
            resolve();
        })
    });


    it("Отправленное сообщение не является переводом", (done) => {
        let message = {
            message: "Купи молока, пожалуйста",
        }
        chai.request(server)
            .post("/findOrderByCredentials")
            .send(message)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('incomingMessage')
                res.body.should.have.property('serverResponse').eql("Сообщение от банка не является переводом")
                done();
            })
    })

    it("Отправленное сообщение - перевод, но заказа с такими данными не удалось найти", (done) => {
        let message = {
            message: "Перевод 200р от КОНСТАНТИН АЛЕКСАНДРОВИЧ У." +
                "Баланс VISA5516: 227.80р",
        }
        chai.request(server)
            .post("/findOrderByCredentials")
            .send(message)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('incomingMessage')
                res.body.should.have.property('serverResponse').eql("Пользователь с такмими данными не найден")
                done();
            })
    }).timeout(5000)

    it("Отправленное сообщение - правильный перевод, следовательно статус заказа меняется", (done) => {
        let message = {
            message: "Перевод 338р от КОНСТАНТИН АЛЕКСАНДРОВИЧ У." +
                "Баланс VISA5516: 227.80р",
        }
        chai.request(server)
            .post("/findOrderByCredentials")
            .send(message)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('incomingMessage')
                res.body.should.have.property('serverResponse').eql("Статус заказа был изменен на оплачено")
                done();
            })
    })


})
