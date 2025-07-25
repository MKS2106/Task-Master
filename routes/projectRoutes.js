import express from "express"
import Project from "../models/Project.js"
import Task from '../models/Task.js'
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/', async(req, res) => {
    try {
        const newProject = await Project.create({...req.body, user: req.user._id})
        const populatedProject = await newProject.populate("user","username",)
        console.log(populatedProject)
        res.status(201).json(populatedProject)
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
})


router.get('/', async(req,res) => {
    try {
        const projects = await Project.find({user: req.user._id}).populate("user", "username").populate("task","title")
        res.status(200).json(projects)
    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            res.status(404).json({message: "No such project found"})
        }
        if(project.user.toString() !== req.user._id.toString()){
            res.status(403).json("User is not authorised to access the project information")
        }

        res.status(201).json(project)

    } catch (error) {
         console.error(error)
        res.status(400).json({error: error.message})
    }
})

router.put('/:id', async (req,res) => {
    try {
       const project = await Project.findById(req.params.id) 

       if(!project){
            res.status(404).json({message: "No such project found"})
       }
       if(project.user.toString() !== req.user._id.toString()){
        res.status(403).json("User is not authorised to update the project information")
       }

       const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
       res.status(201).json(updatedProject);

    } catch (error) {
         console.error(error)
        res.status(400).json({error: error.message})
    }
})
router.delete('/:id', async (req,res) => {
    try {
       const project = await Project.findById(req.params.id) 

       if(!project){
            res.status(404).json({message: "No such project found"})
       }
       if(project.user.toString() !== req.user._id.toString()){
        res.status(403).json("User is not authorised to delete the project information")
       }

       const deletedProject = await Project.findByIdAndDelete(req.params.id, req.body, {new: true})
       res.status(201).json(deletedProject);

    } catch (error) {
         console.error(error)
        res.status(400).json({error: error.message})
    }
})



export default router