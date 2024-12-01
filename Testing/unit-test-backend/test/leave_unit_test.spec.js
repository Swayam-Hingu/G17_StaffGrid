import { request } from 'chai-http';

 
const baseUrl = 'https://staff-grid.onrender.com';


describe('Leave Management System Tests', () => {
  let authTokenEmployee;
  let authTokenAdmin;
 
  it('[Employee] should login successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024030001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);
        
        authTokenEmployee = res.body.token; 
        // console.log("------Emp-------------------") 
        // console.log(res)
        // console.log("------Emp-------------------") 

        done();
      });
  });
 
    it('[Admin] should login successfully and get auth token', (done) => {
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

  it('[Leave] Should apply for a leave successfully', (done) => {
    request.execute(baseUrl)
      .post('/api/leave/apply')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .send({ 
        senderId: '2024030001',
        leaveType: 'Sick Leave',
        fromDate: '2024-12-01',
        toDate: '2024-12-05',
        totalDays: 5,
      })
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Leave] Should fetch all leaves', (done) => {
    request.execute(baseUrl)
      .get('/api/leave/getallleavedetails')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Leave] Should fetch sent leaves for a specific sender', (done) => {
    request.execute(baseUrl)
      .get('/api/leave/getsentleaves/2024030001')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Leave] Should update a leave record', (done) => {
    request.execute(baseUrl)
      .patch('/api/leave/update/L16')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .send({ leaveStatus: 'Approved' })
      .end((err, res) => {
        if (err) return done(err); 
        // console.log(res)
        if (res._body.message=="Leave not found"){ 
            return done(res._body.message);
        }  
        done();
      });
  });
 
  it('[Leave] Should delete a leave record', (done) => {
    request.execute(baseUrl)
      .delete('/api/leave/delete/L15')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err) return done(err);
        // console.log(res)
        if (res._body.error =="Leave record not found."){ 
            return done(res._body.error);
        }  
        done();
      });
  });
 
  it('[Leave] Should fetch approved leave dates', (done) => {
    request.execute(baseUrl)
      .get('/api/leave/listget/2024030001')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        // console.log(res)
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Leave] Should return error for applying leave without mandatory details', (done) => {
    request.execute(baseUrl)
      .post('/api/leave/apply')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .send({
        senderId: '2024030001',
        leaveType: 'Other Reason',
      })
      .end((err, res) => {
        if (err) return done(err); 
        if (res._body.message =="Please provide additional details for 'Other' leave type."){ 
            return done(res._body.message);
        }  
        done();
      });
  });
});
