const express = require("express")
const routes = express.Router()

let Person = require("../models/person")

routes.route('/').get((req, res) => {
    Person.find((err, persons) => {
        if(err){
            res.json(err)
        }
        else {
            res.json(persons)
        }
    })
})

routes.route('/').post((req, res) => {
    let p = new Person()
    p.firstname = req.body.fname
    p.lastname = req.body.lname
    p.save()
     .then(() => {
         res.status(200).json({error:false})
     })
     .catch(() => {
         res.status(400).json({error:true})
     })
})

routes.route('/:id').put((req, res) => {
    Person.findById(req.params.id, (err, p) => {
        if(!p){
            res.status(400).json({error:true})
        } else {
            p.firstname = req.body.fname
            p.lastname = req.body.lname
            p.save().then(() => {
                res.status(200).json({error: false})
            }).catch(() => {
                res.status(400).json({error: true})
            })
        }
    })
})

routes.route('/:id').delete((req, res) => {
    Person.deleteOne({_id: req.params.id}, (err) => {
        if(err) {
            res.status(400).json({error: true})
        } else {
            res.status(200).json({error: false})
        }
    })
})

module.exports = routes