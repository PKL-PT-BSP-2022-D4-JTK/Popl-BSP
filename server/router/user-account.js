const express = require('express')
const router = express.Router()
const db = require('../db')

// CREATE sebuah data
router.post('/', async(req, res, next) => {
    try {
        const user_account = req.body
        const sqlText = `INSERT INTO user_account (username, password, email, phone_no) VALUES ($1, $2, $3, $4) RETURNING *`
        const sqlParams = [user_account.username, user_account.password, user_account.email, user_account.phone_no]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// READ seluruh data (tapi user tidak miliki akses read all user account)
router.get('/', async(req, res, next) => {
    try {
        const sqlText = `SELECT * FROM user_account`;
        const result = (await db.query(sqlText)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// READ details user account tertentu
router.get('/:id', async(req, res, next) => {
    try {
        const sqlText = `SELECT * FROM user_account WHERE id_acc = $1`
        const sqlParams = [req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// UPDATE data
router.put('/:id', async(req, res, next) => {
    try {
        const user_account = req.body
        const sqlText = `UPDATE user_account SET username = $1, password = $2, email = $3, phone_no = $4
        WHERE id_acc = $5 RETURNING *`
        const sqlParams = [user_account.username, user_account.password, user_account.email, user_account.phone_no, req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// DELETE seorang user_account tertentu
router.delete('/:id', async(req, res, next) => {
    try {
        const sqlText = `DELETE FROM user_account WHERE id_acc = $1 RETURNING *`
        const sqlParams = [req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router