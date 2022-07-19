const request = require('supertest');
const app = require('../server/index.js');

let header = ""; // variabel to save cookie

app.get('/test-cookie', function(req, res) {
  res.cookie('cookie', 'hey');
  res.send();
});

describe('Display All Page Test', () => {
  it('should display homepage', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should display login page', async () => {
    const res = await request(app)
      .get('/login');
    expect(res.statusCode).toEqual(200);
  });

  it('should display signup page', async () => {
    const res = await request(app)
      .get('/login');
    expect(res.statusCode).toEqual(200);
  });

  it('should prevent access dashboard if not login', async () => {
    const res = await request(app)
      .get('/dashboard');
    expect(res.statusCode).toEqual(403);
  });
})


describe('Signup Test', () => {
  it('submit empty form', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        "username": null,
        "password": null
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it('only fill username form', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        "username": "test_user",
        "password": null
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it('fill username and password form', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        "username": "test_username",
        "password": "test_password"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("location");
  });

  it('fill same username with other user', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        "username": "test_username",
        "password": "test_password"
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });
});


describe('Login Test', () => {
  it('submit empty form', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        "username": null,
        "password": null
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });
  
  it('fill right username and wrong password form', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        "username": "test_username",
        "password": "asdf"
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });

  it('fill wrong username and right password form', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        "username": "asdf",
        "password": "test_password"
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it('fill wrong username and wrong password form', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        "username": "asdf",
        "password": "asdf"
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it('fill right username and right password form', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        "username": "test_username",
        "password": "test_password"
      });
    
    // Save cookie
    header = res.header;
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("location");
  });
});

async function timeout() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 11000);
  })
}

describe('Dashboard Test', () => {
  it('should display dashboard page', async () => {
    const res = await request(app)
      .get('/dashboard')
      .set("Cookie", [...header["set-cookie"]])
      .send();
    expect(res.statusCode).toEqual(200);
  });

  it('access token should expired', async () => {
    const createWaitTime = await timeout();

    const res = await request(app)
      .get('/dashboard/0')
      .set("Cookie", [...header["set-cookie"]])
      .send();
    expect(res.statusCode).toEqual(403);
  }, 12000);

  it('should get new access token', async () => {
    const res = await request(app)
      .get('/users/token')
      .set("Cookie", [...header["set-cookie"]])
      .send();
    header = res.header;
    expect(res.statusCode).toEqual(200);
  });

  it('should get dashboard data', async () => {
    const res = await request(app)
      .get('/dashboard/0')
      .set("Cookie", [...header["set-cookie"]])
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe('Logout Test', () => {
  it('should logout', async () => {
    const res = await request(app)
      .delete('/users/logout')
      .set("Cookie", [...header["set-cookie"]])
      .send();
    expect(res.statusCode).toEqual(204);
  });
});