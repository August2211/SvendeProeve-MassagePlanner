process.env.SESSION_SECRET = "test-secret";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const argon2 = require("argon2");

const DB = require("../db/database");
const app = require("../app");

const TREATMENT_ROWS = [
    { id: 1, name: "Klassisk massage", price: 399, duration_minutes: 60 },
    { id: 2, name: "Sportsmassage", price: 299, duration_minutes: 30 },
];

function mockDbRows(rows) {
    DB.execute = async () => {return [rows]};
}

function mockDbError() {
    DB.execute = async () => { throw new Error("database is down"); };
}

test("GET / renders the front page", async () => {
    const res = await request(app).get("/");

    assert.equal(res.status, 200);
});

test("GET /auth/login renders the login page", async () => {
    const res = await request(app).get("/auth/login");

    assert.equal(res.status, 200);
});

test("GET /treatments lists treatments from the database", async () => {
    mockDbRows(TREATMENT_ROWS);

    const res = await request(app).get("/treatments");

    assert.equal(res.status, 200);
    assert.match(res.text, /Klassisk massage/);
    assert.match(res.text, /Sportsmassage/);
});

test("GET /treatments returns 500 when the database fails", async () => {
    mockDbError();

    const res = await request(app).get("/treatments");

    assert.equal(res.status, 500);
});

test("GET /availability lists available time slots", async () => {
    mockDbRows([{ id: 1, start_time: new Date("2099-01-01 10:00:00"), end_time: new Date("2099-01-01 11:00:00") }]);

    const res = await request(app).get("/availability");

    assert.equal(res.status, 200);
});

test("GET /admin/treatments redirects to login when not authenticated", async () => {
    const res = await request(app).get("/admin/treatments");

    assert.equal(res.status, 302);
    assert.equal(res.headers.location, "/auth/login");
});

test("POST /auth/login rejects a wrong password", async () => {
    mockDbRows([{ id: 1, password_hash: await argon2.hash("rigtig-adgangskode") }]);

    const res = await request(app).post("/auth/login").type("form").send({ username: "admin", password: "forkert-adgangskode" });

    assert.equal(res.status, 401);
    assert.equal(res.text, "Invalid username or password");
});

test("POST /auth/login logs in and grants access to /admin", async () => {
    mockDbRows([{ id: 1, password_hash: await argon2.hash("rigtig-adgangskode") }]);

    const agent = request.agent(app);
    const loginRes = await agent.post("/auth/login").type("form").send({ username: "admin", password: "rigtig-adgangskode" });

    assert.equal(loginRes.status, 303);
    assert.equal(loginRes.headers.location, "/");

    mockDbRows(TREATMENT_ROWS);
    const adminRes = await agent.get("/admin/treatments");

    assert.equal(adminRes.status, 200);
    assert.match(adminRes.text, /Klassisk massage/);
});

test("POST /book rejects an invalid email", async () => {
    mockDbRows(TREATMENT_ROWS);

    const res = await request(app).post("/book").type("form").send({ treatment_id: 1, start_time: "2099-01-01T10:00", customer_name: "Test Person", customer_email: "ikke-en-email" });

    assert.equal(res.status, 500);
    assert.equal(res.text, "Internal server error");
});