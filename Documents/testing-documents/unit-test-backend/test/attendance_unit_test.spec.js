import { request } from 'chai-http';

 
const baseUrl = 'http://localhost:8000';

describe('Attendance System Tests', () => {
  let authTokenEmployee;
 
  it('[Employee] should login successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024030001', pass: 'R123456' })
      .end((err, res) => {
        if (err) {
            return done(err);
        }
        authTokenEmployee = res.body.token; 
        done();
      });
  });
 
  it('[Attendance] Should return If Attendance Done', (done) => {
    request.execute(baseUrl)
      .post('/api/attendance')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .send({
        id: '2024030001',
        latitude: 23.1902117, 
        longitude: 72.6280792,
      })
      .end((err, res) => {
        // console.log(res)
        if (res._body.message=="Your attendance has already been marked."){ 
            return done(res._body.message);
        } 
        done()
      });
  });
 
  it('[Attendance] Should fetch attendance records for an employee', (done) => {
    request.execute(baseUrl)
      .get('/api/attendance/2024030001')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err)   return done(err);  
        done();
      });
  });
 
  it('[Attendance] Should fetch absent days for an employee', (done) => {
    request.execute(baseUrl)
      .get('/api/attendance/getabs/2024030001')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err)   return done(err); 
        done();
      });
  });
 
  it('[Attendance] Should return error for invalid employee ID', (done) => {
    request.execute(baseUrl)
      .post('/api/attendance')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .send({
        id: ' 111',
        latitude: 23.1902117,
        longitude: 72.6280792,
      })
      .end((err, res) => {
        // console.log(res)
        if (res._body.message=='Employee with this ID not found.') {
            return done(res._body.message); 
        }else{
            done();

        }
        
 
      });
  });
});
