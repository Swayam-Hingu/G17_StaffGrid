// @ts-nocheck
import { request } from 'chai-http';

const baseUrl = 'http://localhost:8000';

describe('Announcement API Tests', () => {
  let authTokenAdmin;
  let authTokenEmployee;
 
  it('[Admin] should log in successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024000001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);

        authTokenAdmin = res.body.token;
        done();
      });
  });
 
  it('[Employee] should log in successfully and get auth token', (done) => {
    request.execute(baseUrl)
      .post('/api/login')
      .send({ id: '2024030001', pass: 'R123456' })
      .end((err, res) => {
        if (err) return done(err);

        authTokenEmployee = res.body.token;
        done();
      });
  });
 
//   it('[Admin] should post an announcement successfully', function (done) { 

//     if (!authTokenAdmin) return done(new Error('Auth token is missing.'));

//     const announcementPayload = {
//         senderID: '2024000001',
//         senderRole: 'admin',
//         receiverIDs: ['2024030001', '2024030002'],
//         message: 'All the best',
//     };

//     request.execute(baseUrl)
//         .post('/api/login/announcement')
//         .set('cookie', `jwt=${authTokenAdmin}`)
//         .send(announcementPayload)
//         .end((err, res) => {
//             if (err) return done(err); 

//             done();
//         });
// });


  // Employee views announcements addressed to them
  it('[Employee] should view announcements addressed to them', (done) => {
    if (!authTokenEmployee) return done(new Error('Auth token is missing.'));

    request.execute(baseUrl)
      .get('/api/login/viewannouncement')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Admin] should fetch the last counters for roles', (done) => {
    if (!authTokenAdmin) return done(new Error('Auth token is missing.'));

    request.execute(baseUrl)
      .get('/api/login/alllastcnt')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .end((err, res) => {
        if (err) return done(err); 
        done();
      });
  });
 
  it('[Employee] should view announcements sent by them', (done) => {
    if (!authTokenEmployee) return done(new Error('Auth token is missing.'));

    request.execute(baseUrl)
      .get('/api/login/viewannouncementsendbyme')
      .set('cookie', `jwt=${authTokenEmployee}`)
      .end((err, res) => {
        if (err) return done(err);
 
        done();
      });
  });
 
  it('[Admin] should fail to post an announcement with missing message', (done) => {
    if (!authTokenAdmin) return done(new Error('Auth token is missing.'));

    const invalidAnnouncementPayload = {
      senderID: '2024000001',
      senderRole: 'admin',
      receiverIDs: ['2024030001', '2024030002'],
    };

    request.execute(baseUrl)
      .post('/api/login/announcement')
      .set('cookie', `jwt=${authTokenAdmin}`)
      .send(invalidAnnouncementPayload)
      .end((err, res) => { 
        if(res.text=='{"message":"error"}')
        {
            done(res.text)
        }
        done();
      });
  });
 
  it('[Employee] should fail to fetch announcements without authentication', (done) => {
    request.execute(baseUrl)
      .get('/api/login/viewannouncement')
      .end((err, res) => { 
        done();
      });
  });
 
  it('[Admin] should fail to fetch last counters without authentication', (done) => {
    request.execute(baseUrl)
      .get('/api/login/alllastcnt')
      .end((err, res) => { 
        done();
      });
  });
});
