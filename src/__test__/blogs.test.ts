// step 1
import request from "supertest";
// step 2
import { mongoConnect, mongoDisconnect } from "../services/mongo";
import { app } from "../app";
import {
  blogData,
  userTokenToTest,
  singleBlogId,
  updateBlogData,
  userSignupData,
  userLoginData,
} from "../mock/static";
import User from "../models/userModels";

// let token = userTokenToTest as string;
let token: string;

// ste 3. test description
describe("Blog API", () => {
  // step 3.1. connect to database
  beforeAll(async () => {
    await mongoConnect();
  });

  // step 3.2. disconnect to database
  afterAll(async () => {
    // clear database
    await User.deleteMany();
    await mongoDisconnect();
  });

  describe("Welcome API message", () => {
    test("It should return 200 and welcome message", async () => {
      const { body } = await request(app)
        .get("/api/v1/")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("Welcome to Blog API");
    });
    // blog GET all blog  test
    test("It should return 200 and list of all blogs", async () => {
      const { body } = await request(app)
        .get("/api/v1/blogs")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("success");
      // here we except to have all blog data
      expect(body.blogs).toBeDefined();
    });

    // blog GET a single blog  test
    test("It should return 200 and single blog", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/${singleBlogId}`)
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("success");
      expect(body.blog).toBeDefined();
    });

    // GET a single blog  not found test
    test("It should return 404 for single blog not found", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/123345`)
        .expect("Content-Type", /json/)
        .expect(404);
      expect(body.message).toStrictEqual("Blog Not found");
    });

    //////////////////////////////
    // Login and signup test
    //////////////////////////////
    test("It should return signup and login successfully", async () => {
      const response = await request(app)
        .post("/api/v1/user/signup")
        .send(userSignupData)
        .expect("Content-Type", /json/)
        .expect(201);

      const responseLogin = await request(app)
        .post("/api/v1/user/login")
        .send(userLoginData)
        .expect(200);

      console.log("+++++++++++++++++++++", responseLogin.body.token);
      token = responseLogin.body.token;
    });

    // // blog POST create a blog  test
    test("It should return 201 and new blog created", async () => {
      const { body } = await request(app)
        .post("/api/v1/blogs")
        .expect("Content-Type", /json/)
        .set("Authorization", `Bearer ${token}`)
        .send(blogData)
        .expect(201);
      console.log("+++++++++++++++++++", token);
      expect(body.message).toStrictEqual("Blog created");
      expect(body.blog).toBeDefined();
    });

    // POST create a blog test failed for unauthorize
    test("It should return 400 for unauthorize", async () => {
      const { body } = await request(app)
        .post("/api/v1/blogs")
        .expect("content-Type", /json/)
        .send(blogData);
      expect(400);
    });

    // Update single blog
    // test("It should return 404 for not update single blog", async () => {
    //   const { body } = await request(app)
    //     .patch(`/api/v1/blogs/${singleBlogId}`)
    //     .send(updateBlogData)
    //     .set("Authorization", `Bearer ${token}`);
    //   // .expect(200);

    //   expect(body.message).toStrictEqual("Success");
    //   expect(body.blog).toBeDefined();
    // });

    // Update single blog
    // test("It should return 200 and update single blog", async () => {
    //   const { body } = await request(app)
    //     .patch(`/api/v1/blogs/${singleBlogId}`)
    //     .send(updateBlogData)
    //     .set(
    //       "Authorization",
    //       `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Zjk5MDIyOTE0ZDlkY2E4OGVhOWMzZCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3MTA4NjA3ODIsImV4cCI6MTcxMDk0NzE4Mn0.6xTOdKpgVs3ymsYTuYfVQC4gle_7XIdY-nlqLoqidW8`
    //     );
    //   // .expect(200);

    //   expect(body.message).toStrictEqual("Success");
    //   expect(body.blog).toBeDefined();
    // });
  });

  // // query test
  // describe("Querry test", () => {
  //   test("", () => {});
  // });

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
  // });
});
