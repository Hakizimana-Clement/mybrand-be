import request from "supertest";
import {
  mongoConnectToTestingDB,
  mongoDisconnectToTestingDB,
} from "../services/mongo.testing";
import { app } from "../app";

import User from "../models/userModels";
import Blog from "../models/blogModels";
// import Blog from "./image_upload_test/working";
import mongoose from "mongoose";
import {
  adminLoginData,
  adminSignupData,
  blogData,
  commentDatas,
  querryDataWithOutMessage,
  querryData,
  updateBlogData,
} from "../mock/static";
jest.setTimeout(20000);
let token: string;
let blogId: mongoose.Types.ObjectId;
let queryId: string;
import path from "path";
describe("Blog API", () => {
  // step 3.1. connect to database
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

  //////////////////////////////
  // Login and signup test
  //////////////////////////////
  describe("POST signup and login ", () => {
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

  // // Test case for creating a blog
  // test("It should return 201 and Create new blog", async () => {
  //   // Send a POST request to the blog creation endpoint
  //   const { body } = await request(app)
  //     .post("/api/v1/blogs")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(blogData)
  //     .expect(201);

  //   expect(body.blog).toHaveProperty("_id");
  //   expect(body.blog.title).toBe(blogData.title);
  //   expect(body.blog.writer).toBe(blogData.writer);
  //   expect(body.blog.writer).toBe(blogData.writer);
  //   expect(body.blog.content).toBe(blogData.content);
  //   blogId = body.blog._id;

  //   console.log("bbbbbbbbbbbb blog id bbbbbbbbbbbbb", blogId);
  // });
  // // Test case for creating a blog
  // test("It should return 201 and Create new blog", async () => {
  //   const imagePath = path.resolve(__dirname, "image.jpg");
  //   const { body } = await request(app)
  //     .post("/api/v1/blogs")
  //     .set("Authorization", `Bearer ${token}`)
  //     .field("title", blogData.title)
  //     .field("writer", blogData.writer)
  //     .field("content", blogData.content) .attach("blogImage", imagePath)
  //     .expect(201);

  //   expect(body.blog).toHaveProperty("_id");
  //   expect(body.blog.title).toBe(blogData.title);
  //   expect(body.blog.writer).toBe(blogData.writer);
  //   expect(body.blog.content).toBe(blogData.content);
  //   blogId = body.blog._id;

  //   console.log("bbbbbbbbbbbb blog id bbbbbbbbbbbbb", blogId);
  // });

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
  // test("It should return 200 and single blog", async () => {
  //   const { body } = await request(app)
  //     .get(`/api/v1/blogs/${blogId}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  //   expect(body.message).toStrictEqual("success");
  //   expect(body.blog).toBeDefined();
  // });

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
  // test("It should return 200 and update single blog", async () => {
  //   const { body } = await request(app)
  //     .patch(`/api/v1/blogs/${blogId}`)
  //     .send(updateBlogData)
  //     .set("Authorization", `Bearer ${token}`)
  //     .expect(200);

  //   expect(body.message).toStrictEqual("Blog update successfully");
  //   expect(body.blog).toBeDefined();
  // });

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
  // test("It should return 200 and delete single blog", async () => {
  //   const { body } = await request(app)
  //     .delete(`/api/v1/blogs/${blogId}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .expect(200);
  //   console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", blogId);
  // });
  describe("Like", () => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CREATE LIKE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // test("It should return 201 for creating like on single post", async () => {
    //   const { body, status } = await request(app)
    //     .post(`/api/v1/blogs/${blogId}/likes`)
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect("Content-Type", /json/)
    //     .expect(201);

    //     expect(status).toBe(201);
    //     expect(body.message).toBe("Created");
    //     expect(body.blog_id).toBe(blogId);
    // });

    // test("It should return 404 for blog id not found for creating like on single post", async () => {
    //   const { body } = await request(app)
    //     .post(`/api/v1/blogs/${blogId}/likes`)
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect("Content-Type", /json/)
    //     .expect(404);
    //   expect(body.message).toStrictEqual("Blog Not found");
    // });

    // // Read all LIKE
    // test("It should return 200 and list all likes", async () => {
    //   console.log(
    //     "kkkkkkkkkkkkkkkkkkkkk all likquerriese kkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    //     blogId
    //   );

    //   const { body } = await request(app)
    //     // .get(`/api/v1/blogs/${blogId}/likes`)
    //     .get(`/api/v1/blogs/6601616c591dbefd5dce62a1/likes`)
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect("Content-Type", /json/)
    //     .expect(200);

    //   expect(body.message).toStrictEqual("success");
    // });
    test("It should return 201 for create comment", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send(commentDatas);
      expect(201);
      console.log(body);
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // QUERY
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  describe("Query Endpoint", () => {
    test("It should create a query and return 201", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .send(querryData)
        .expect(201);

      expect(body.message).toBe("Created querry successfully");
      expect(body.query._id).toBeDefined();
      queryId = body.query._id;
    });

    test("It should return 400 for invalid query data", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .send(querryDataWithOutMessage)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      expect(body.status).toBe("400");
      expect(body.message).toBe("Bad request");
    });

    test("It should return 200 and list all queries", async () => {
      const { body } = await request(app)
        .get("/api/v1/queries")
        .expect(200)
        .set("Authorization", `Bearer ${token}`);

      expect(body.message).toBe("success");
      expect(body.querries).toBeDefined();
    });

    test("It should delete a query and return 200", async () => {
      await request(app)
        .delete(`/api/v1/queries/${queryId}`)
        .expect(200)
        .set("Authorization", `Bearer ${token}`);
    });

    test("It should return 404 for deleting a non-existent query", async () => {
      const nonExistentQueryId = "nonExistentId";
      const { body } = await request(app)
        .delete(`/api/v1/queries/${nonExistentQueryId}`)
        .expect(404)
        .set("Authorization", `Bearer ${token}`);

      expect(body.status).toBe("404");
      expect(body.error).toBe("Query Not Found");
    });
  });
});
