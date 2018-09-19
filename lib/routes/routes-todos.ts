import * as express from 'express'
var router = express.Router()
import client from '../config/db-config'

import Todos from '../models/model-todos'

import authRequired from '../middlewares/auth-required'


router.get('/', authRequired,  (req, res: any) => {

    client.query('SELECT * FROM todos', (err, todos: any) => {
        if (!todos || !todos.rows.length) {
            res.t.message = "No Todos available"
            return res.send(res.t)
        }
        res.t.success = true
        res.t.message = "Todos Found"
        res.t.data = todos.rows
        console.log(err, todos)
        
        return res.send(res.t)
        
    })
})

router.post('/', authRequired,   function (req: any, res: any) {

    if (!req.body.title || !req.body.place || !req.body.description) {
        res.t.message = "Invalid Request"
        return res.send(res.t)
    }
    const queryInsert = {
        text: 'INSERT INTO todos( title, place, description, status) VALUES($1, $2, $3, $4) RETURNING *',
        values: [ req.body.title, req.body.place, req.body.description, req.body.status],
    }
    client.query(queryInsert, (err, todo: any) => {
        res.send(err ? err : todo)
    })

})

// get one TODO
router.get('/:id',authRequired,   function (req, res: any) {

    let { id } = req.params
    const queryOneTodo = {
        text: 'SELECT * FROM todos WHERE _id = ($1) ',
        values: [id]

    }

    client.query(queryOneTodo, (err, todos: any) => {
        if (!todos || !todos.rows.length) {
            res.t.message = "No Todos available"
            return res.send(res.t)
        }
        res.t.success = true
        res.t.message = "Todos Found"
        res.t.data = todos.rows
        return res.send(res.t)
    })
})

// Update Todos 
router.put('/:id', authRequired,  function (req: any, res: any) {

    if (!req.body.title || !req.body.place || !req.body.description) {
        res.t.message = "Invalid Request"
        return res.send(res.t)
    }
    let { id }: any = req.params;
    let { title, place, description, status }: any = req.body;
    const queryUpdate = {
        text: 'UPDATE todos SET title= ($1), place=($2), description =($3), status=($4)  WHERE _id = ($5) ',
        values: [title, place, description, status, id],
    }
    client.query(queryUpdate, (err: any, todo: any) => {
        if (!todo) {
            res.t.message = "Todo not available"
            return res.send(res.t)
        }
        res.t.success = true
        res.t.message = "Todo Found"
        res.t.data = todo
        return res.send(res.t)

    })

})

//Delete Todo
router.delete('/:id', authRequired,  function (req: any, res: any) {
    let { id }: any = req.params;
    const queryDelete = {
        text: 'DELETE FROM todos  WHERE _id = ($1) RETURNING *',
        values: [id]
    }
    client.query(queryDelete, (err: any, todo: any) => {
        if (!todo) {
            res.t.message = "Todo not available"
            return res.send(res.t)
        }
        res.t.success = true
        res.t.message = "Todo Deleted"
        res.t.data = todo
        return res.send(res.t)
    })
})


export default router