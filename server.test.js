const supertest = require("supertest")
const server = require('./server')
const db = require("./database/dbConfig");

// beforeEach(async () => {
//     await db("users").truncate();
//   });

test("Welcome Api", async () => {
    const res = await supertest(server).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/welcome/i)
})

test("Register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: "Lala", password: "123" })
    expect(res.statusCode).toBe(201)
    expect(res.body.username).toBe("Lala")
})

test("Login", async () => {
    const res = await supertest(server).post("/api/auth/login").send({ username: "Martin", password: "123" })
    expect(res.statusCode).toBe(200)
})

let token;

beforeAll((done) => {
    supertest(server)
        .post('/api/auth/login')
        .send({username: 'Martin', password: '123'})
        .end((err, res) => {
            token = res.body.token;
            done();
        })
})

describe('Get /', () => {
    it('Should return 200 with auth', (done) => {
        console.log(token)
        supertest(server)
            .get('/api/jokes')
            .set('Authorization', `Bearer ${token}`)
            expect(response.statusCode).toBe(200);
    })
})





