const projectModel = require('../model/projectModel');

const generateProjectID = async () => {
    const lastProject = await projectModel.findOne().sort({ createdAt: -1 });
    if (!lastProject) return 'p1';
    const lastID = lastProject.projectID;
    const lastNumber = parseInt(lastID.substring(1), 10);
    return `p${lastNumber + 1}`;
};

// Upload new project Details
async function handleProjectUpload(req,res){
    try {
        const newProject = new projectModel({
          projectID: await generateProjectID(),
          title: req.body.title,
          description: req.body.description,
          teamManager: {
            id: req.body.teamManagerId,
            name: req.body.teamManagerName,
          },
      
          teamMembers: [
            { id: req.body.teamMem1Id, name: req.body.teamMem1Name },
            { id: req.body.teamMem2Id, name: req.body.teamMem2Name },
            { id: req.body.teamMem3Id, name: req.body.teamMem3Name },
            { id: req.body.teamMem4Id, name: req.body.teamMem4Name },
            { id: req.body.teamMem5Id, name: req.body.teamMem5Name }
          ].filter(member => member.id && member.name), 
      
          status: req.body.status,
      
          tasks: [
            {
              taskTitle: req.body.t1Title,
              taskDescription: req.body.t1Description,
              assignedTo: { id: req.body.t1AssignedToId, name: req.body.t1AssignedToName },
              dueDate: req.body.t1DueDate,
              status: req.body.t1Status,
            },
            {
              taskTitle: req.body.t2Title,
              taskDescription: req.body.t2Description,
              assignedTo: { id: req.body.t2AssignedToId, name: req.body.t2AssignedToName },
              dueDate: req.body.t2DueDate,
              status: req.body.t2Status,
            },
            {
              taskTitle: req.body.t3Title,
              taskDescription: req.body.t3Description,
              assignedTo: { id: req.body.t3AssignedToId, name: req.body.t3AssignedToName },
              dueDate: req.body.t3DueDate,
              status: req.body.t3Status,
            },
            {
              taskTitle: req.body.t4Title,
              taskDescription: req.body.t4Description,
              assignedTo: { id: req.body.t4AssignedToId, name: req.body.t4AssignedToName },
              dueDate: req.body.t4DueDate,
              status: req.body.t4Status,
            }
          ].filter(task => task.taskTitle && task.assignedTo.id && task.assignedTo.name), // Entry that is filled
      
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          createdAt: new Date()
        });
      
        const savedProject = await newProject.save();
        res.status(201).send({ status: "true", message: "Project Uploaded Successfully" });
      } catch (error) {
        res.status(400).send({ error: error.message });
    }
      
}

// get all list of peoject details
async function handleGetAllProject(req,res){
    try {
        const projects = await projectModel.find();
        res.status(200).send({status:"true" , allProjects:projects});
    }catch (error) {
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
    try{
    const updatedProject = await projectModel.findOneAndUpdate({
        title: req.body.title,
        description: req.body.description,
        teamManager: {
            id: req.body.teamManagerId,
            name: req.body.teamManagerName,
        },
      
        teamMembers: [
            { id: req.body.teamMem1Id, name: req.body.teamMem1Name },
            { id: req.body.teamMem2Id, name: req.body.teamMem2Name },
            { id: req.body.teamMem3Id, name: req.body.teamMem3Name },
            { id: req.body.teamMem4Id, name: req.body.teamMem4Name },
            { id: req.body.teamMem5Id, name: req.body.teamMem5Name }
        ].filter(member => member.id && member.name), 
      
        status: req.body.status,
      
        tasks: [
            {
              taskTitle: req.body.t1Title,
              taskDescription: req.body.t1Description,
              assignedTo: { id: req.body.t1AssignedToId, name: req.body.t1AssignedToName },
              dueDate: req.body.t1DueDate,
              status: req.body.t1Status,
            },
            {
              taskTitle: req.body.t2Title,
              taskDescription: req.body.t2Description,
              assignedTo: { id: req.body.t2AssignedToId, name: req.body.t2AssignedToName },
              dueDate: req.body.t2DueDate,
              status: req.body.t2Status,
            },
            {
              taskTitle: req.body.t3Title,
              taskDescription: req.body.t3Description,
              assignedTo: { id: req.body.t3AssignedToId, name: req.body.t3AssignedToName },
              dueDate: req.body.t3DueDate,
              status: req.body.t3Status,
            },
            {
              taskTitle: req.body.t4Title,
              taskDescription: req.body.t4Description,
              assignedTo: { id: req.body.t4AssignedToId, name: req.body.t4AssignedToName },
              dueDate: req.body.t4DueDate,
              status: req.body.t4Status,
            }
            ].filter(task => task.taskTitle && task.assignedTo.id && task.assignedTo.name), // Entry that is filled
      
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        });

    if (!updatedProject) return res.status(404).send({ message: 'Project not found' });
    res.status(200).send({status:"true" , message:"Updated Successfully"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete existing project
async function handleDeleteProject(req,res){
    try {
        const deletedProject = await projectModel.findOneAndDelete({ projectID: req.params.id });
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).send({ status:"true",message: 'Project deleted successfully'});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

  
module.exports = {
    handleProjectUpload,
    handleGetAllProject,
    handleGetPerticulerProject,
    handleUpdateProjectDetail,
    handleDeleteProject
}