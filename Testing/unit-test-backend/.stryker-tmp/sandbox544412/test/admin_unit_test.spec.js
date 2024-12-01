// @ts-nocheck
import { request } from 'chai-http';

const baseUrl = 'http://localhost:8000';

let authTokenAdmin;
let testEmployeeId = '2024030022';  

describe('Admin Routes', () => {
 
  it('[Admin] Login ', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024000001', pass: 'R123456' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        authTokenAdmin = res.body.token;
        done();
      });
  });
 
  it('[Admin] should retrieve all employee details with profiles', (done) => {
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Admin login test may have failed.'));
    }

    request.execute(baseUrl)
      .get('/api/login/viewAllemployee')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res)
        done();
      });
  });
 
  it('[Admin] should delete an employee and all associated data successfully', (done) => {
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Admin login test may have failed.'));
    }

    request.execute(baseUrl)
      .delete(`/api/login/delete/${testEmployeeId}`)
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (res._body.message=='Employee not found') {
            return done(res._body.message);
          }
        //console.log(res)
        done();
      });
  });
 
  it('[Admin] should return an error if employee to delete is not found', (done) => {
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Admin login test may have failed.'));
    }

    const nonExistentEmployeeId = '9999999999';  
    request.execute(baseUrl)
      .delete(`/api/login/delete/${nonExistentEmployeeId}`)
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (res._body.message=='Employee not found') {
          return done(res._body.message);
        }
        // console.log(res)
        done();
      });
  });

});
