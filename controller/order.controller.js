const db = require('../db')

class OrderController {
    async findOrderByCredentials(req, res) {
        let message = req.body.message
        console.log(message)
        message = message.split(" ")

        let firstname;
        let patronimic;
        let lastname;
        let price;


        if (message[0] === "Перевод") {
            firstname = message[3];
            patronimic = message[4];
            lastname = message[5][0];
            price = message[1].slice(0, -1)

            await db.query(`INSERT INTO j8693520_demo.wy5ja_messages_logs (logs, date) VALUES ('${req.body.message}', '${new Date()}')`)

            await db.query("SELECT w5jvou.virtuemart_order_id, order_total, order_status, w5jvou.first_name, w5jvou.last_name, w5jvou.middle_name from j8693520_demo.wy5ja_virtuemart_orders inner join j8693520_demo.wy5ja_virtuemart_order_userinfos w5jvou on" +
                "    j8693520_demo.wy5ja_virtuemart_orders.virtuemart_order_id = w5jvou.virtuemart_order_id WHERE order_status = 'P'" +
                "                                                                                    and w5jvou.first_name = ?" +
                `                                                                                    and w5jvou.last_name LIKE '%${lastname}%'` +
                "                                                                                    and w5jvou.middle_name = ?" +
                "                                                                                    and order_total = ?", [firstname, patronimic, price], async (err, rows) => {
                if (rows.length) {
                    console.log(rows)
                    await db.query(`UPDATE j8693520_demo.wy5ja_virtuemart_orders t SET t.order_status = 'C' WHERE t.virtuemart_order_id = ${rows[0].virtuemart_order_id}`)
                }
            })
        }
        await res.json(req.body.message)
    }

    async health(req, res) {
        console.log('health')
        await res.json(".")
    }
}


module.exports = new OrderController();
