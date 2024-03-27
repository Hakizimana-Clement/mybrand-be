import request from "supertest";
import mongoose from "mongoose"; // Import Mongoose
import User from "../models/userModels";
import { app } from "../app"; // Import your Express app
import Blog from "../models/blogModels"; // Import your Blog model
import {
  adminLoginData,
  adminSignupData,
  blogData,
  querryData,
  querryDataWithOutMessage,
  updateBlogData,
} from "../mock/static"; // Import your test blog data
import cloudinary from "../utils/cloudinary";
import path from "path";
const imagePath = path.resolve(__dirname, "image.jpg");
import {
  mongoConnectToTestingDB,
  mongoDisconnectToTestingDB,
} from "../services/mongo.testing";

let blogId: mongoose.Types.ObjectId;
let token: string;
let queryId: string;

jest.setTimeout(20000);
describe("All API Endpoint", () => {
  beforeAll(async () => {
    await mongoConnectToTestingDB();
  });

  // step 3.2. disconnect to database
  afterAll(async () => {
    // clear database after to create user for avoiding errors
    await User.deleteMany({});
    await Blog.deleteMany({});
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
  });
  //////////////////////////////
  // Login and signup test
  //////////////////////////////
  describe("Signup and Login ", () => {
    test("It should return signup and login successfully", async () => {
      const response = await request(app)
        .post("/api/v1/users/signup")
        .send(adminSignupData)
        .expect("Content-Type", /json/)
        .expect(201);

      console.log(response.body);
      const responseLogin = await request(app)
        .post("/api/v1/users/login")
        .send(adminLoginData)
        .expect(200);

      console.log(
        "+++++++++ SIGN UP DATA ++++++++++++",
        responseLogin.body.token
      );
      token = responseLogin.body.token;
    });
  });

  describe("Blog endpoint", () => {
    it("should return 201 and create a new blog", async () => {
      try {
        // Send a request to create a blog endpoint
        const { body } = await request(app)
          .post("/api/v1/blogs")
          .set("Authorization", `Bearer ${token}`)
          .field("title", blogData.title)
          .field("writer", blogData.writer)
          .field("writeImage", blogData.writeImage)
          .field("content", blogData.content)
          .attach("blogImage", imagePath);

        expect(body.message).toStrictEqual("Blog created");

        blogId = body.blog._id;
      } catch (error) {
        // Handle any errors that occur during the upload or request
        console.error("Error creating blog:", error);
      }
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
    // Update single blog
    //////////////////////////////
    test("It should return 200 and update single blog", async () => {
      const { body } = await request(app)
        .patch(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateBlogData)
        .expect(200);

      expect(body.message).toStrictEqual("Blog update successfully");
      expect(body.blog).toBeDefined();
    });

    //////////////////////////////
    // 401 for unauthorize on update single blog
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
        .expect(200);
      expect(body.message).toStrictEqual("delete blog successfully");
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // QUERY
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // create query
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  describe("Queries Endpoint", () => {
    test("It should return 201 for creating querry", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .expect("Content-Type", /json/)
        .send(querryData)
        .expect(201);

      expect(body.message).toStrictEqual("Created querry successfully");
      queryId = body.query._id;
    });

    // list all querry
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("It should return 200 and list all queries", async () => {
      const { body } = await request(app)
        .get("/api/v1/queries")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body.message).toBe("success");
      expect(body.querries).toBeDefined();
    });

    // delete querry
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("It should delete a query and return 200", async () => {
      const { body } = await request(app)
        .delete(`/api/v1/queries/${queryId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.message).toStrictEqual("delete query successfully");
    });
    // querry id not exist
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("It should return 404 for deleting a non-existent query", async () => {
      const queryIdNotExist = "123458329";
      const { body } = await request(app)
        .delete(`/api/v1/queries/${queryIdNotExist}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      expect(body.status).toBe("404");
      expect(body.error).toBe("Query Not Found");
    });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Authentication middleware
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  describe("Authcheck middleware", () => {
    it("should allow access for admin user", async () => {
      const adminToken = token;
      const response = await request(app)
        .get("/api/v1/queries")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).toBe(200);
    });

    it("should reject requests without authorization header", async () => {
      const response = await request(app).get("/api/v1/queries");
      expect(response.status).toBe(401);
    });

    it("should reject requests with invalid authorization header", async () => {
      // Send a request with an invalid authorization header
      const response = await request(app)
        .get("/api/v1/queries")
        .set("Authorization", "Bearer 34567uhgfdsae5678ijhgfdsw34");
      expect(response.status).toBe(401);
    });

    it("should reject requests from non-admin users", async () => {
      const nonAdminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAyZDBkYzNlZTdlOTQ2NTk4MjVmMzIiLCJuYW1lIjoiZmlkZWxlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTE0NjA2NTQsImV4cCI6MTcxMTU0NzA1NH0.PRd0qGppTjWwis9gZjlQ64hfMfzPow6BAn_SmDEXPjs";

      const response = await request(app)
        .get("/api/v1/queries")
        .set("Authorization", `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(401);
    });
  });
});
