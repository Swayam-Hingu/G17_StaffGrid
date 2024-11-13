const mongoose = require('mongoose');

/*
projectID
title
description
teamManager
teamMembers
status (['Pending', 'In Progress', 'Completed', 'On Hold'])
tasks{
    taskTitle
    taskDescription
    assignedTo
    dueDate
    status
}
startDate
createdAt
endDate
*/

const projectDetailSchema = new mongoose.Schema({
  projectId : {type:String, required:true},
  title: { type: String,required: true, },
  description: { type: String, required: true,},
  teamManager: {
    id:{ type:String,require:true},
    name:{ type:String,require:true}
  },
  teamMembers: [{
    id:{ type:String},
    name:{ type:String}
  }],

  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold'],
    default: 'Pending',
  },
  tasks: [{
    taskTitle: { type: String, required: true, },
    taskDescription: {type: String,},
    assignedTo: {
        id:{ type:String},
        name:{ type:String}
    },
    dueDate: { type: Date,},
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed', 'Blocked'],
      default: 'Not Started',
    },
  }],
  startDate: { type: Date,},
  endDate: { type: Date,},
  createdAt: { type: Date,default: Date.now,},
  
});

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);
module.exports = ProjectDetail;
