const express = require('express')
const bodyParser = require('body-parser')
const StudentsModel = require('./models/StudentsModel')
const { Router } = require("express")

const router = Router()

router.post('/add',(req,res)=>{
    var dofb = new Date(req.body.dob)
    
    if(dofb.getTime() > Date.now()) res.status(400).send('Wrong Date')

    try{
        StudentsModel.findOne({reg_id:{$eq:req.body.reg_id}},async(err,student)=>{
            if (err) res.status(500).send(err)
            else if(student != null) res.status(400).send('ID Already Exists!')
            else {
                const stud = new StudentsModel({
                    reg_id : req.body.reg_id,
                    name : req.body.name,
                    dob : new Date(req.body.dob),
                    class : req.body.class,
                    guardian : req.body.guardian,
                    guardian_contact : req.body.guardian_contact
                })
                await stud.save()
                res.send(req.body)
            }
        })
        
    } catch (err){
        console.log(err)
    }
})

router.get('/getall',(req,res)=>{
    StudentsModel.find({},(err,students)=>{
        if(err) res.status(500).send(err)
        else res.send(students)
    })
})

router.get('/get/:id',(req,res)=>{
    var id = req.params['id']
    StudentsModel.findOne({reg_id:{$eq:id}},(err,student)=>{
        if (err) res.status(500).send(err)
        else if(student == null) res.status(404).send('ID not Found')
        else res.send(student)
    })
})

router.put('/update/:id', (req,res)=>{
    var id = req.params['id']
    StudentsModel.findOne({reg_id:{$eq:id}},async (err,student)=>{
        if(student == null) res.status(404).send('ID not Found')
        else {
            StudentsModel.findOneAndUpdate({reg_id:{$eq:id}},{name:req.body.name,dob:req.body.dob,class:req.body.class,guardian:req.body.guardian,guardian_contact:req.body.guardian_contact},(err,some)=>{
                if(err) res.status(500).send(err)
                else {
                    StudentsModel.findOne({reg_id:{$eq:id}}, (err,student)=>{
                        if(err) res.status(500).send(err)
                        else res.send(student)
                    })
                }
            })
        }
    })
})

router.delete('/delete/:id',(req,res)=>{
    var id = req.params['id']
    StudentsModel.findOne({reg_id:{$eq:id}},(err,student)=>{
        if(err) res.status(500).send(err)
        else if(student == null) res.status(404).send('ID not Found')
        else StudentsModel.deleteOne({reg_id:{$eq:id}}).then(res.send('Data Deleted'))
    })
})


module.exports = router