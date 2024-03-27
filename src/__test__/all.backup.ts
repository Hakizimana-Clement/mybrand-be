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
  querryDataWithOutMessage,
} from "../mock/static";
import User from "../models/userModels";
import Blog from "../models/blogModels";
// import Blog from "./image_upload_test/working";
import mongoose from "mongoose";
jest.setTimeout(30000);
let token: string;
let blogId: mongoose.Types.ObjectId;
let queryId: string;

const blogDataa = {
  title: "Empty child giant solidg queen pair heavy circus specific...",
  writer: "testing 2",
  writeImage: "http://ehuhopgu.sn/dedirafan",
  blogImage:
    "https://images.unsplash.com/photo-1605076776194-9b98ba75eb36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvdyUyMGtleSUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
  content:
    "noun choose army course something pupil anywhere happily round familiar clothes unhappy roof hungry replace noon refer canal problem ordinary open policeman nervous arrange. spoken saved drove trunk leaving anyone health layers his pony surface plain blow proud pipe political real muscle cabin road married bicycle without century",
};

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
    // await Blog.deleteMany({});
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

    //////////////////////////////
    // blog POST create a blog  test
    //////////////////////////////
    // test("It should return 201 and new blog created", async () => {
    //   const { body } = await request(app)
    //     .post("/api/v1/blogs")
    //     .expect("Content-Type", /json/)
    //     .set("Authorization", `Bearer ${token}`)
    //     .send(blogData)
    //     .expect(201);

    //   console.log("********* BLOG DATA **************** ", body.blog);
    //   expect(body.message).toStrictEqual("Blog created");
    //   expect(body.blog).toBeDefined();
    //   blogId = body.blog._id;
    // });

    // Test case for creating a blog
    test("Create Blog", async () => {
      // Send a POST request to the blog creation endpoint
      const { body } = await request(app)
        .post("/api/v1/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogData)
        .expect(201);

      // Expect the body body to contain the created blog data
      // expect(body.body).toHaveProperty("status", "201");
      // expect(body.body).toHaveProperty("message", "Blog created");
      expect(body.blog).toHaveProperty("_id");
      expect(body.blog.title).toBe(blogData.title);
      expect(body.blog.writer).toBe(blogData.writer);
      expect(body.blog.writer).toBe(blogData.writer);
      expect(body.blog.content).toBe(blogData.content);
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
        .expect(204);
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", blogId);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // QUERY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////
    // CREATE a querry
    //////////////////////////////
    test("It should return 201 for creating querry", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .expect("Content-Type", /json/)
        .send(querryData)
        .expect(201);

      expect(body.message).toStrictEqual("Created querry successfully");
      // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", body.querry);
      queryId = body.query._id;
    });

    test("It should return 400 for not creating querry", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .set(querryDataWithOutMessage)
        .expect(400);
    });

    //////////////////////////////
    // GET all querries
    //////////////////////////////
    test("It should return 200 and list all of querries", async () => {
      const { body } = await request(app)
        .get("/api/v1/queries/")
        .expect("Content-Type", /json/)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body.message).toStrictEqual("success");
      expect(body.querries).toBeDefined();
    });

    //////////////////////////////
    // DELETE single querry
    //////////////////////////////
    test("It should return 204 for delete a single querry", async () => {
      const { body } = await request(app)
        .delete(`/api/v1/querries/${queryId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });

    // DELETE ERROR NOT QUERY FOUND single querry
    test("It should return 404 for wrong id passed in deleting a single querry", async () => {
      const { body } = await request(app)
        .delete(`/api/v1/querries/${34576543}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(body.message).toStrictEqual("Not found");
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // LIKE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CREATE LIKE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("It should return 404 for blog id not found for creating like on single post", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}/likes`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(404);
      expect(body.message).toStrictEqual("Blog Not found");
    });
    // test("It should return 201 for create like on single post", async () => {
    //   console.log("lllllllllllllikellllllllllll", blogId);
    //   // Send a POST request to create a like
    //   const response = await request(app)
    //     .post(`/api/v1/blogs/${blogId}/likes`)
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect("Content-Type", /json/)
    //     .expect(201);

    //   // Verify the response body
    //   expect(response.body.message).toBe("Created");
    // });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Read all LIKE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // test("It should return 200 and list all querries", async () => {
    //   console.log(
    //     "kkkkkkkkkkkkkkkkkkkkk all querries kkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    //     blogId
    //   );

    //   const { body } = await request(app)
    //     .get(`/api/v1/blogs/${blogId}/likes`)
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect("Content-Type", /json/)
    //     .expect(200);

    //   expect(body.message).toStrictEqual("success");
    // });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // COMMENT
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    describe("POST /api/v1/blogs/:id/comments", () => {
      test("It should successfully create a comment on a blog post", async () => {
        const response = await request(app)
          .post(`/api/v1/blogs/${blogId}/comments`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "John Doe",
            email: "john@example.com",
            comment: "This is a test comment",
          })
          .expect(201);

        expect(response.body.message).toBe("Created");
        // expect(response.body.comments).toBeDefined(); // Verify comment data
      });

      test("It should return 404 for an invalid blog ID", async () => {
        const response = await request(app)
          .post(`/api/v1/blogs/invalidID/comments`)
          .send({
            name: "John Doe",
            email: "john@example.com",
            comment: "This is a test comment",
          });

        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe("404");
        expect(response.body.message).toBe("Not found");
        expect(response.body.error).toBe("Blog Not Found");
      });

      test("It should return 404 if the blog does not exist", async () => {
        const nonExistentBlogId = "606c692a3507c09e34388f87"; // Assuming this ID does not exist
        const response = await request(app)
          .post(`/api/v1/blogs/${nonExistentBlogId}/comments`)
          .send({
            name: "John Doe",
            email: "john@example.com",
            comment: "This is a test comment",
          });

        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe("404");
        expect(response.body.message).toBe("Not found");
        expect(response.body.error).toBe("Blog Not Found");
      });
    });
  });
});
