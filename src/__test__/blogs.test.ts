import request from "supertest";
import {
  mongoConnectToTestingDB,
  mongoDisconnectToTestingDB,
} from "../services/mongo.testing";
import { app } from "../app";
import {
  blogData,
  singleBlogId,
  adminSignupData,
  adminLoginData,
  updateBlogData,
  querryData,
} from "../mock/static";
import User from "../models/userModels";
import Blog from "../models/blogModels";
import mongoose from "mongoose";
jest.setTimeout(20000);
let token: string;
let blogId: mongoose.Types.ObjectId;
let queryId: string;

let fileDataToUpload =
  "file:///C:/Users/ThinkBig/Pictures/250788850016_status_f2a67f1e03b84d5dafdd02f17bfd56a5.jpg";

// ste 3. test description
describe("Blog API", () => {
  // step 3.1. connect to database
  beforeAll(async () => {
    await mongoConnectToTestingDB();
  });

  // step 3.2. disconnect to database
  afterAll(async () => {
    // clear database after to create user for avoiding errors
    await User.deleteMany();
    // await Blog.deleteMany();
    await mongoDisconnectToTestingDB();
  });

  describe("Welcome API message", () => {
    test("It should return 200 and welcome message", async () => {
      const { body } = await request(app)
        .get("/api/v1/")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("Welcome to Blog API");
    });
    //////////////////////////////
    // Login and signup test
    //////////////////////////////
    test("It should return signup and login successfully", async () => {
      const response = await request(app)
        .post("/api/v1/user/signup")
        .send(adminSignupData)
        .expect("Content-Type", /json/)
        .expect(201);

      const responseLogin = await request(app)
        .post("/api/v1/user/login")
        .send(adminLoginData)
        .expect(200);

      console.log(
        "+++++++++ SIGN UP DATA ++++++++++++",
        responseLogin.body.token
      );
      token = responseLogin.body.token;
    });

    //////////////////////////////
    // blog POST create a blog  test
    //////////////////////////////
    test("It should return 201 and new blog created", async () => {
      const { body } = await request(app)
        .post("/api/v1/blogs")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .send(blogData)
        .expect(201);
      console.log("********* BLOG DATA **************** ", body.blog);
      expect(body.message).toStrictEqual("Blog created");
      expect(body.blog).toBeDefined();
      blogId = body.blog._id;
    });

    //////////////////////////////
    // POST create a blog test failed for unauthorize
    //////////////////////////////
    test("It should return 400 for unauthorize to create blog", async () => {
      const { body } = await request(app)
        .post("/api/v1/blogs")
        .expect("content-Type", /json/)
        .send(blogData);
      expect(400);
    });

    //////////////////////////////
    // blog GET all blog test
    //////////////////////////////
    test("It should return 200 and list of all blogs", async () => {
      const { body } = await request(app)
        .get("/api/v1/blogs")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("success");
      // here we except to have all blog data
      expect(body.blogs).toBeDefined();
    });

    //////////////////////////////
    // blog GET a single blog test
    //////////////////////////////
    test("It should return 200 and single blog", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/${blogId}`)
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("success");
      expect(body.blog).toBeDefined();
    });

    //////////////////////////////
    // GET a single blog not found test
    //////////////////////////////
    test("It should return 404 for single blog not found", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/123345`)
        .expect("Content-Type", /json/)
        .expect(404);
      expect(body.message).toStrictEqual("Blog Not found");
    });

    //////////////////////////////
    // Update single blog
    //////////////////////////////
    test("It should return 200 and update single blog", async () => {
      const { body } = await request(app)
        .patch(`/api/v1/blogs/${blogId}`)
        .send(updateBlogData)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body.message).toStrictEqual("Blog update successfully");
      expect(body.blog).toBeDefined();
    });

    //////////////////////////////
    // 400 for no data passed to update single blog
    //////////////////////////////
    test("It should return 401 for unauthorize on update single blog", async () => {
      const { body } = await request(app)
        .patch(`/api/v1/blogs/${blogId}`)
        // .set("Authorization", `Bearer ${token}`)
        .expect(401);
    });

    //////////////////////////////
    // delete single blog
    //////////////////////////////
    test("It should return 204 and delete single blog", async () => {
      const { body } = await request(app)
        .delete(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });

    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   // QUERY
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   //////////////////////////////
    //   // CREATE a querry
    //   //////////////////////////////
    //   test("It should return 201 for creating querry", async () => {
    //     const { body } = await request(app)
    //       .post("/api/v1/querries")
    //       .expect("Content-Type", /json/)
    //       .send(querryData)
    //       .expect(201);

    //     expect(body.message).toStrictEqual("Created querry successfully");
    //     console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", body.querry);
    //     queryId = body.query._id;
    //   });

    //   //////////////////////////////
    //   // GET all quirries
    //   //////////////////////////////
    //   test("It should return 200 and list all of querries", async () => {
    //     const { body } = await request(app)
    //       .get("/api/v1/querries/")
    //       .expect("Content-Type", /json/)
    //       .set("Authorization", `Bearer ${token}`)
    //       .expect(200);

    //     expect(body.message).toStrictEqual("success");
    //     expect(body.querries).toBeDefined();
    //   });
    //   //////////////////////////////
    //   // DELETE single querry
    //   //////////////////////////////
    //   test("It should return 204 for delete a single querry", async () => {
    //     const { body } = await request(app)
    //       .delete(`/api/v1/querries/${queryId}`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .expect(204);
    //   });

    //   // DELETE ERROR NOT QUERY FOUND single querry
    //   test("It should return 404 for wrong id passed in deleting a single querry", async () => {
    //     const { body } = await request(app)
    //       .delete(`/api/v1/querries/${34576543}`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .expect(404);
    //     expect(body.message).toStrictEqual("Not found");
    //   });
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   // LIKE
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   // CREATE LIKE
    //   test("It should return 201 for create like on single post", async () => {
    //     console.log("lllllllllllllllllllllllll", blogId);
    //     const { body } = await request(app)
    //       .post(`/api/v1/blogs/${blogId}/likes`)
    //       // .post(`/api/v1/blogs/65fafb06a33612e96af6ce96/likes`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .expect("Content-Type", /json/);
    //     expect(body.message).toStrictEqual("Created");
    //   });
    // });
    // .expect(201);

    // // like test
    // describe("Likes test", () => {
    //   test("", () => {});
    // });

    // // comment test
    // describe("Comment test", () => {
    //   test("", () => {});
    // });
    // // authentication test
    // describe("Comment test", () => {
    //   test("", () => {});
  });
});

// export default token;
