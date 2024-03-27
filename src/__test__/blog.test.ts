import request from "supertest";
import mongoose from "mongoose"; // Import Mongoose
import User from "../models/userModels";
import { app } from "../app"; // Import your Express app
import Blog from "../models/blogModels"; // Import your Blog model
import { adminLoginData, adminSignupData, blogData } from "../mock/static"; // Import your test blog data
import cloudinary from "../utils/cloudinary";
import path from "path";
const imagePath = path.resolve(__dirname, "image.jpg");
import {
  mongoConnectToTestingDB,
  mongoDisconnectToTestingDB,
} from "../services/mongo.testing";

let token: string;

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
      // const uploadImageToCloudinary = await cloudinary.uploader.upload(
      //   imagePath
      // );
      // // Send a request to create a blog endpoint
      // const response = await request(app)
      //  .post('/api/v1/blogs')
      //   .set('Authorization', `Bearer ${token}`)
      //   .field('title', blogData.title)
      //   .field('writer', blogData.writer)
      //   .field('writeImage', blogData.writeImage)
      //   .field('content', blogData.content)
      //   .attach('blogImage', uploadImageToCloudinary.secure_url);
      // console.log("newwwwwwwwwwwwwwwwwwwww", console.log(response.body));
      // // Assert that the response is successful
      // expect(response.body.status).toBe(201);
      // expect(response.body.message).toBe("Blog created");
      // Upload the image to Cloudinary
      try {
        const uploadResponse = await cloudinary.uploader.upload(imagePath);
        const imageUrl = uploadResponse.secure_url;
        console.log("iiiiiiiiiiimmmmmmmmmmmmaaaaaaaaaaage", imageUrl);
        console.log("iiiiiiiiiiiToooooookennaaaaaaage", token);

        // Send a request to create a blog endpoint
        const response = await request(app)
          .post("/api/v1/blogs")
          .set("Authorization", `Bearer ${token}`)
          .field("title", blogData.title)
          .field("writer", blogData.writer)
          .field("writeImage", blogData.writeImage)
          .field("content", blogData.content)
          .attach("blogImage", imagePath);

        expect(response.body.message).toStrictEqual("Blog created");
      } catch (error) {
        // Handle any errors that occur during the upload or request
        console.error("Error creating blog:", error);
        fail("Failed to create blog");
      }
    });
  });
});
