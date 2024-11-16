const express = require('express');
const {handleProjectUpload,handleGetAllProject,handleGetPerticulerProject,handleUpdateProjectDetail,
    handleDeleteProject,handleAssignProjects} = require("../controllers/projectController");
const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware');
const managermiddleware = require('../middlewares/managermiddleware')
const employeemiddleware = require('../middlewares/employeemiddleware')

router.post("/upload",authmiddleware,managermiddleware,handleProjectUpload);
router.get("/:managerID",authmiddleware,managermiddleware,handleGetAllProject);
router.get("/employee/:employeeID",authmiddleware,employeemiddleware,handleAssignProjects);
router.get("/:projectID",authmiddleware,managermiddleware,handleGetPerticulerProject);
router.patch("/:projectID",authmiddleware,managermiddleware,handleUpdateProjectDetail);
router.delete("/:projectID",authmiddleware,managermiddleware,handleDeleteProject);

module.exports = router;


