const express = require ('express')
const app = express()
const cors = require('cors')

const mysql = require('mysql')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employee-system-simple'
})

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const position = req.body.position
    const code = req.body.code
    const salary = req.body.salary

    db.query('INSERT INTO employees (name, age, position, printerCode, salary) VALUES (?,?,?,?,?)', 
    [name, age, position, code, salary], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({msg: "values inserted"}) //message results sent
        }
    })
})

app.get('/employees',(req, res) => {
    db.query('SELECT * FROM employees', 
    (err,result) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).json({result: result})
        }
    })
})

app.put('/update', (req, res) => {
    const employee_id = req.body.id
    const salary = req.body.salary
    db.query("UPDATE employees SET salary = ? WHERE employee_id = ?", 
        [salary, employee_id], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({result: result})
            }
        }
    )
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM employees WHERE employee_id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({result: result})
            }
        }
    )
})

// app.delete('/')

app.listen(3001, () => console.log("Hello World on port 3001"))