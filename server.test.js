const supertest = require("supertest")
const server = require('./server')

test("Welcome Api", async () => {
    const res = await supertest(server).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/welcome/i)
})

test("Register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: "Martin", password: "123" })
    expect(res.statusCode).toBe(201)
    expect(res.body.username).toBe("Martin")
})



