import { request } from 'chai-http';

 
const baseUrl = 'http://localhost:8000';

describe('Profile Management Tests', () => {
  let authTokenEmployee;
   
    it('[Employee] should login successfully and get auth token', (done) => {
        request.execute(baseUrl)
          .post('/api/login')
          .send({ id: '2024030003', pass: 't8n@ehXq' })
          .end((err, res) => {
            if (err) return done(err);
            authTokenEmployee = res.body.token; 
            // console.log(authTokenEmployee) 
            done();
          });
      });

  it('[Profile] Should save user profile successfully', (done) => {
    request.execute(baseUrl)
      .post('/profile/api/add-detailprofile/2024030003')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .send({   
        firstName: 'Riddhi',
        lastName: 'Mistry',
        fatherName: 'Miteshbhai',
        motherName: 'Neeta ben',
        birthDate: '1990-01-01', 
        phoneNumber: '1234567890',
        gender: 'male',
        nationality: 'Indian',
        religion: 'Hindu',
        block: 'A',
        street: 'Street 1',
        village: 'Village A',
        taluka: 'Taluka A',
        district: 'District A',
        pincode: '123456',
        country: 'India',
        bankName: 'Bank A',
        ifscCode: 'BANK1234',
        accountNo: '123456789012',
        aadharNumber: '123456789012',
      })
      .end((err, res) => {
        //console.log(res)
        done();
      });
  });

  it('[Profile] Should retrieve user profile by ID', (done) => {
    request.execute(baseUrl)
      .get('/profile/api/getEmpfulldetailbyid/2024030003')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        // console.log(res);
        done();
      });
  });



  it('[Profile] Should return error for non-existing profile on detailed check', (done) => {
    request.execute(baseUrl)
      .get('/profile/api/checkfillornot/2024030003')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => { 
        done();
      });
  });
});
