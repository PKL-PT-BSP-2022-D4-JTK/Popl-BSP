const express = require('express')
const app = express()
const PORT = 3000
const createUserAccountTable = require('./db/user-account-storage')
const user_account = require('./router/user-account')

app.use(express.json())
app.use('/api/user-account', user_account)

app.listen(PORT, async() => {
    try {
        await createUserAccountTable()
        console.log(`LISTEN TO PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})
