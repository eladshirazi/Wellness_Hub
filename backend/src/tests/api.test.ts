// import request from "supertest";
// import app from "../server";

// describe("API Tests", () => {
//   let token: string;

//   // **User Authentication Tests**
//   it("should register a new user", async () => {
//     const res = await request(app).post("/api/auth/register").send({
//       username: "testuser",
//       email: "testuser@example.com",
//       password: "password123",
//     });
//     expect(res.status).toBe(201);
//   });

//   it("should login and return a JWT token", async () => {
//     const res = await request(app).post("/api/auth/login").send({
//       email: "testuser@example.com",
//       password: "password123",
//     });
//     expect(res.status).toBe(200);
//     expect(res.body.token).toBeDefined();
//     token = res.body.token;
//   });

//   // **User Profile Tests**
//   it("should fetch the logged-in user's profile", async () => {
//     const res = await request(app)
//       .get("/api/user/profile")
//       .set("Authorization", `Bearer ${token}`);
//     expect(res.status).toBe(200);
//   });

//   // **Forum Tests**
//   let postId: string;

//   it("should create a new post", async () => {
//     const res = await request(app)
//       .post("/api/posts")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ text: "This is a test post" });
//     expect(res.status).toBe(201);
//     postId = res.body._id;
//   });

//   it("should fetch all posts", async () => {
//     const res = await request(app)
//       .get("/api/posts")
//       .set("Authorization", `Bearer ${token}`);
//     expect(res.status).toBe(200);
//   });

//   it("should update a post", async () => {
//     const res = await request(app)
//       .put(`/api/posts/${postId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ text: "Updated test post" });
//     expect(res.status).toBe(200);
//   });

//   it("should delete a post", async () => {
//     const res = await request(app)
//       .delete(`/api/posts/${postId}`)
//       .set("Authorization", `Bearer ${token}`);
//     expect(res.status).toBe(200);
//   });

//   // **Comments Tests**
//   it("should add a comment to a post", async () => {
//     const res = await request(app)
//       .post("/api/comments")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ postId, text: "This is a test comment" });
//     expect(res.status).toBe(201);
//   });

//   it("should fetch comments for a post", async () => {
//     const res = await request(app)
//       .get(`/api/comments/${postId}`)
//       .set("Authorization", `Bearer ${token}`);
//     expect(res.status).toBe(200);
//   });

//   // **AI Recommendation Tests**
//   it("should return AI-generated recommendations", async () => {
//     const res = await request(app)
//       .post("/api/ai-recommend")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ symptoms: "fatigue, headache" });
//     expect(res.status).toBe(200);
//   });
// });
