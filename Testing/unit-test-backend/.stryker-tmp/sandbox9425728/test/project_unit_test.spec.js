// @ts-nocheck
import { request } from 'chai-http';
const baseUrl = 'http://localhost:8000';  

describe('Project Management Tests', () => {
  let authTokenAdmin;
  let authTokenManager;
  let authTokenEmployee;
 
  it('[Admin] should login and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024000001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);
        authTokenAdmin = res.body.token;
        // console.log(authTokenAdmin)
        done();
      });
  });

  
 
  it('[Manager] should login and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024020001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);
        authTokenManager = res.body.token;
        // console.log(authTokenManager)

        done();
      });
  });
 
  it('[Employee] should login and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024030001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);
        authTokenEmployee = res.body.token;
        // console.log(authTokenEmployee)

        done();
      });
  });
 
  it('[Admin] should successfully upload a project', (done) => {
    if (!authTokenAdmin) return done(new Error('Admin token is missing.'));
    
    const projectData = {
      title: 'NewProject',
      description: 'NEW---Project------:>', 
      teamMembers: [{ id: '2024030001'}],
      status: 'Active',
      tasks: [
        { taskTitle: 'Task 1', taskDescription: 'Description for Task 1', assignedTo: { id: '2024030001' }, dueDate: '2024-12-01', status: 'Incomplete' },
      ],
      startDate: '2024-11-30',
      endDate: '2024-12-30'
    };

    request.execute(baseUrl)
      .post('/api/project/upload')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .send(projectData)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Manager] should retrieve all projects for manager', (done) => {
    if (!authTokenManager) return done(new Error('Manager token is missing.'));
    
    request.execute(baseUrl)
      .get(`/api/project/2024020001`)   
      .set('cookie', `jwt=${authTokenManager}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Admin] should retrieve a specific project by ID', (done) => {
    if (!authTokenAdmin) return done(new Error('Admin token is missing.'));
    
    request.execute(baseUrl)
      .get('/api/project/p1')   
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });

  
  it('[Admin] should successfully update a project', (done) => {
    if (!authTokenAdmin) return done(new Error('Admin token is missing.'));
    
    const updateData = {
      title: 'Updated Project Title',
      description: 'Updated Project Description'
    };

    request.execute(baseUrl)
      .patch('/api/project/p1')   
      .set('cookie', `jwt=${authTokenAdmin}`)
      .send(updateData)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Admin] should successfully delete a project', (done) => {
    if (!authTokenAdmin) return done(new Error('Admin token is missing.'));
    
    request.execute(baseUrl)
      .delete('/api/project/p1')   
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Employee] should retrieve projects assigned to them', (done) => {
    if (!authTokenEmployee) return done(new Error('Employee token is missing.'));
    
    request.execute(baseUrl)
      .get(`/api/project/employee/2024030001`)   
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
 

});

