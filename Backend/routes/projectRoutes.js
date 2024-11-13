const express = require('express');
const {handleProjectUpload,handleGetAllProject,handleGetPerticulerProject,handleUpdateProjectDetail,
    handleDeleteProject} = require("../controllers/projectController");
const router = express.Router();

router.post("/upload",handleProjectUpload);
router.get("/",handleGetAllProject);
router.get("/:projectID",handleGetPerticulerProject);
router.patch("/:projectID",handleUpdateProjectDetail);
router.delete("/:projectID",handleDeleteProject);

module.exports = router;


