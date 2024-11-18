const express = require('express');
const {handleProjectUpload,handleGetAllProject,handleGetPerticulerProject,handleUpdateProjectDetail,
    handleDeleteProject,handleAssignProjects} = require("../controllers/projectController");
const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware');
const adminmanagermiddleware = require('../middlewares/adminmanagermiddleware')
const employeemiddleware = require('../middlewares/employeemiddleware')

router.post("/upload",authmiddleware,adminmanagermiddleware,handleProjectUpload);
router.get("/:managerID",authmiddleware,adminmanagermiddleware,handleGetAllProject);
router.get("/employee/:employeeID",authmiddleware,employeemiddleware,handleAssignProjects);
router.get("/:projectID",authmiddleware,adminmanagermiddleware,handleGetPerticulerProject);
router.patch("/:projectID",authmiddleware,adminmanagermiddleware,handleUpdateProjectDetail);
router.delete("/:projectID",authmiddleware,adminmanagermiddleware,handleDeleteProject);

module.exports = router;


