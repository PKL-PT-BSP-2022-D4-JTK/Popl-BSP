const db = require('./index')
const TABLE_NAME = 'user_account'

async function createUserAccountTable(){    
    try {
        console.log('USER ACCOUNT TABLE CREATED')
        let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
            id_acc SERIAL NOT NULL,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone_no VARCHAR(15) NOT NULL,
            PRIMARY KEY (id_acc)
        )`
        await db.query(sql)
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = createUserAccountTable