// import request from "supertest";
// import {
//   mongoConnectToTestingDB,
//   mongoDisconnectToTestingDB,
// } from "../services/mongo.testing";
// import { app } from "../app";
// import {
//   blogData,
//   singleBlogId,
//   adminSignupData,
//   adminLoginData,
//   updateBlogData,
//   querryData,
// } from "../mock/static";
// import User from "../models/userModels";
// import Blog from "../models/blogModels";
// import mongoose from "mongoose";
// jest.setTimeout(20000);
// let token: string;
// let blogId: mongoose.Types.ObjectId;
// let queryId: string;

// // ste 3. test description
// describe("Blog API", () => {
//   // step 3.1. connect to database
//   beforeAll(async () => {
//     await mongoConnectToTestingDB();
//   });

//   // step 3.2. disconnect to database
//   afterAll(async () => {
//     // clear database after to create user for avoiding errors
//     await User.deleteMany();
//     // await Blog.deleteMany();
//     await mongoDisconnectToTestingDB();
//   });

//   describe("Welcome Querry endpoint", () => {
//     //////////////////////////////
//     // Login and signup test
//     //////////////////////////////
//     test("It should return signup and login successfully", async () => {
//       const response = await request(app)
//         .post("/api/v1/user/signup")
//         .send(adminSignupData)
//         .expect("Content-Type", /json/)
//         .expect(201);

//       const responseLogin = await request(app)
//         .post("/api/v1/user/login")
//         .send(adminLoginData)
//         .expect(200);

//       console.log(
//         "+++++++++ SIGN UP DATA ++++++++++++",
//         responseLogin.body.token
//       );
//       token = responseLogin.body.token;
//     });

//     // CREATE a querry
//     //////////////////////////////
//     test("It should return 201 for creating querry", async () => {
//       const { body } = await request(app)
//         .post("/api/v1/querries")
//         .expect("Content-Type", /json/)
//         .send(querryData)
//         .expect(201);

//       expect(body.message).toStrictEqual("Created querry successfully");
//       console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", body.querry);
//       queryId = body.query._id;
//     });

//     //////////////////////////////
//     // GET all quirries
//     //////////////////////////////
//     test("It should return 200 and list all of querries", async () => {
//       const { body } = await request(app)
//         .get("/api/v1/querries/")
//         .expect("Content-Type", /json/)
//         .set("Authorization", `Bearer ${token}`)
//         .expect(200);

//       expect(body.message).toStrictEqual("success");
//       expect(body.querries).toBeDefined();
//     });
//     //////////////////////////////
//     // DELETE single querry
//     //////////////////////////////
//     test("It should return 204 for delete a single querry", async () => {
//       const { body } = await request(app)
//         .delete(`/api/v1/querries/${queryId}`)
//         .set("Authorization", `Bearer ${token}`)
//         .expect(204);
//     });

//     // DELETE ERROR NOT QUERY FOUND single querry
//     test("It should return 404 for wrong id passed in deleting a single querry", async () => {
//       const { body } = await request(app)
//         .delete(`/api/v1/querries/${34576543}`)
//         .set("Authorization", `Bearer ${token}`)
//         .expect(404);
//       expect(body.message).toStrictEqual("Not found");
//     });
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////
//   });
// });
