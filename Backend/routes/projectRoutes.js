const express = require('express');
const {
    handleProjectUpload,
    handleGetAllProject,
    handleGetPerticulerProject,
    handleUpdateProjectDetail,
    handleDeleteProject,
    handleAssignProjects,
    handleGetAllProjectbyAdmin
} = require("../controllers/projectController");

const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware');
const adminmanagermiddleware = require('../middlewares/adminmanagermiddleware')
const employeemiddleware = require('../middlewares/employeemiddleware')
const adminmiddleware = require('../middlewares/adminmiddleware')

//Project upload 
router.post("/upload",authmiddleware,adminmanagermiddleware,handleProjectUpload);

//List of Upload Project
router.get("/:managerID",authmiddleware,adminmanagermiddleware,handleGetAllProject);

//for Employee [Assign project details]
router.get("/employee/:employeeID",authmiddleware,employeemiddleware,handleAssignProjects);

//get project detail by project id
router.get("/:projectID",authmiddleware,adminmanagermiddleware,handleGetPerticulerProject);

//Update the project status
router.patch("/:projectID",authmiddleware,adminmanagermiddleware,handleUpdateProjectDetail);

//Delete uploaded project
router.delete("/:projectID",authmiddleware,adminmanagermiddleware,handleDeleteProject);

module.exports = router;


