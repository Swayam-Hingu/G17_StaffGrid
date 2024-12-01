import { request } from 'chai-http';

const baseUrl = 'https://staff-grid.onrender.com';

describe('Auth Tests', () => {
  let authTokenAdmin;
  let authTokenManager;
  let authTokenEmployee; 
  let authTokenHr; 
   
  it('[Admin] should login successfully and get auth token', (done) => {
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
 
  it('[Manager] should login successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024030001', pass: 'R123456' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        authTokenManager = res.body.token;
        done();
      });
  });
 
  it('[HR] should login successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024010001', pass: 'LDypMCQu' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        authTokenHr = res.body.token;
        done();
      });
  });
 
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

  // Admin-only: Register Employee
  it('[Admin] should register a new employee successfully', (done) => { 
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }

    request.execute(baseUrl)
      .post('/api/register')
      .set('cookie', `jwt=${authTokenAdmin}`)  // Ensure to include JWT for authentication
      .send({
        name: 'RAMA23',
        mail: '202201238@daiict.ac.in',
        role: 'hr',
      })
      .end((err, res) => {
        if (res.body.error) {
          return done(res.body.error);
        }

        done();   
      });
  });
 
  it('[Admin] should successfully logout with valid token', (done) => {
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }

    request.execute(baseUrl)
      .get('/api/logout')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
 
  it('[Manager] should successfully logout with valid token', (done) => {
    if (!authTokenManager) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }

    request.execute(baseUrl)
      .get('/api/logout')
      .set('cookie', `jwt=${authTokenManager}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
 
  it('[HR] should successfully logout with valid token', (done) => {
    if (!authTokenHr) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }

    request.execute(baseUrl)
      .get('/api/logout')
      .set('cookie', `jwt=${authTokenHr}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
 
  it('[Employee] should successfully logout with valid token', (done) => {
    if (!authTokenEmployee) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }
    // console.log(authTokenEmployee)
    request.execute(baseUrl)
      .get('/api/logout')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

   
 
  it('[Admin] should fail to register an employee with invalid email', (done) => {
    if (!authTokenAdmin) {
      return done(new Error('Auth token is missing. Login test may have failed.'));
    }

    request.execute(baseUrl)
      .post('/api/register')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .send({
        name: 'Rama',
        mail: 'Xm1@gmail.com',   
        role: 'employee',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
 
        if (res.body.error) {
          done();  
        } else {
          done(new Error('Expected error due to invalid email.'));
        }
      });
  });
});

  