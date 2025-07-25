import express from 'express'
import Task from '../models/Task.js'
import Project from '../models/Project.js';

import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/:id/tasks', async(req, res) => {
    try {

        const project = await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({error: "No such project"})
        }
        if(project.user.toString() !== req.user._id.toString()){
            return res.status(403).json("User is not authorised to access the project information")
        }
        const newTask = await Task.create({...req.body, user: req.user._id, project: req.params.id})
        const populatedTask = await newTask.populate("project","name")
        // console.log(newTask)
        res.status(201).json(populatedTask)
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
})

router.get('/:id/tasks', async(req, res) => {
    try {

        const project = await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({error: "No such project"})
        }
        if(project.user.toString() !== req.user._id.toString()){
            return res.status(403).json("User is not authorised to access the project information")
        }
        
        const tasks = await Task.find({project: req.params.id}).populate("project", "name")
        // console.log(newTask)
        res.status(200).json(tasks)
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
})

router.put('/:id', async(req, res) => {
    try {

        const task = await Task.findById(req.params.id)
        console.log(task)
        const project = await Project.findById(task.project)

        if(!task){
            return res.status(404).json({error: "No such task"})
        }
        
            if(project.user.toString() !== req.user._id.toString()){
            return res.status(403).json("User is not authorised to access the project information")
        }
        
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // console.log(newTask)
        res.status(200).json(updatedTask)
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
})

router.delete('/:id', async(req, res) => {
    try {

        const task = await Task.findById(req.params.id)
        console.log(task)
        const project = await Project.findById(task.project)

        if(!task){
            return res.status(404).json({error: "No such task"})
        }
        
            if(project.user.toString() !== req.user._id.toString()){
            return res.status(403).json("User is not authorised to access the project information")
        }
        
        const deletedTask = await Task.findByIdAndDelete(req.params.id, req.body, {new: true})
        console.log("Task deleted successfully")
        // res.status(200).json(deletedTask)
        res.status(200).json({ message: "Task deleted!" })
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
})
export default router
