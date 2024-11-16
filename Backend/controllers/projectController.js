const projectModel = require('../model/projectModel');

const generateProjectID = async () => {
    const lastProject = await projectModel.findOne().sort({ createdAt: -1 });
    if (!lastProject) return 'p1';
    const lastID = lastProject.projectId;  
    const lastNumber = parseInt(lastID.substring(1), 10); 
    return `p${lastNumber+1}`;
};

// Upload new project Details
async function handleProjectUpload(req,res){
    try {
        const newProject = new projectModel({
          projectId: await generateProjectID(),
          title: req.body.title,
          description: req.body.description,
          teamManager: req.body.teamManager, 
          teamMembers: req.body.teamMembers.map(member => ({ id: member.id})),
      
          status: req.body.status,
       
          tasks: req.body.tasks 
          .map(task => ({
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription,
            assignedTo: {
              id: task.assignedTo.id 
            },
            dueDate: task.dueDate,
            status: task.status,
          })),
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          createdAt: new Date()
        });
        // console.log(newProject);

        const savedProject = await newProject.save(); 

        res.status(201).send({ status: "true", message: "Project Uploaded Successfully" });
      } catch (error) {
        res.status(400).send({ error: error.message });
    }
      
}

// get all list of peoject details
async function handleGetAllProject(req,res){
    // try {
    //     const projects = await projectModel.find();
    //     res.status(200).send({status:"true" , allProjects:projects});
    // }catch (error) {
    //     res.status(500).send({ error: error.message });
    // }
    console.log("----------------------------------------------")
    const { managerID } = req.params;  
      try {
        const projects = await projectModel.find({ 'teamManager.id':  managerID });
  
          if (!projects) return res.status(404).send({ message: 'Project not found' });

          // console.log(projects)
  
          res.status(200).send({status:"true" , projects});
      } catch (error) {
          res.status(500).send({ error: error.message });
      }
  
}

// get perticuler project 
async function handleGetPerticulerProject(req,res){
    try {
        const project = await projectModel.findOne({ projectID: req.params.id });

        if (!project) return res.status(404).send({ message: 'Project not found' });

        res.status(200).send({status:"true" , projectDetail: project});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// update project detail
async function handleUpdateProjectDetail(req,res){

    console.log("Enter--------------UPDATE-----------------------")
    try{
      const projectId = req.params.projectID;
      const projectData = req.body;
      console.log(projectId,projectData)
      const updatedProject = await projectModel.findOneAndUpdate(
        { projectId: projectId },
          projectData,
          { new: true }
      );
      
      if (!updatedProject) {
          return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({
          message: "Project updated successfully",
          updatedProject
      });

    } catch(error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ message: "Server error" });
    }
}

// delete existing project
async function handleDeleteProject(req,res){
    console.log("projectId: ",req.params.projectID);
    try {
        const deletedProject = await projectModel.findOneAndDelete({ projectId: req.params.projectID });
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        const updatedProjects = await projectModel.find({});

        res.status(200).send({ status:"true",
          message: 'Project deleted successfully',
          projects: updatedProjects});
          
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleAssignProjects(req,res){
  const { employeeID } = req.params;  
  try {
  const projects = await projectModel.find({
    teamMembers: { $elemMatch: { id: employeeID } },  
  });

  if (!projects || projects.length === 0) {
    return res.status(404).json({ message: "No projects assigned to this employee." });
  }
  res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects for employee:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching projects.",
    });
  }
}
  
module.exports = {
    handleProjectUpload,
    handleGetAllProject,
    handleGetPerticulerProject,
    handleUpdateProjectDetail,
    handleDeleteProject,
    handleAssignProjects
}