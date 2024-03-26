// import fs from "fs";

// Read the image file as a buffer
// const imageBuffer = fs.readFileSync(
//   "file:///C:/Users/ThinkBig/Pictures/250788850016_status_f2a67f1e03b84d5dafdd02f17bfd56a5.jpg"
// );
// const imageBuffer = fs.readFileSync("./image_upload_test/working.jpg");
// const imageBuffer = fs.readFileSync(
//   "file:///D:/andela/Andela/backend/src/__test__/image_upload_test/working.jpg"
// );
// // Convert the buffer to a Base64 string
// const base64Image = imageBuffer.toString("base64");

// export const blogData = {
//   writeImage: "http://ehuhopgu.sn/dedirafan",
//   writer: "testing 2",
//   // Use the Base64 string here
//   blogImage: `data:image/jpeg;base64,${base64Image}`,
//   content: "noun choose army course something pupil anywhere happily round familiar clothes unhappy roof hungry replace noon refer canal problem ordinary open policeman nervous arrange. spoken saved drove trunk leaving anyone health layers his pony surface plain blow proud pipe political real muscle cabin road married bicycle without century",
// };
import path from "path";
const imagePath = path.resolve(__dirname, "image.jpg");
export const blogData = {
  title: "terrible continued charge buy magic shinning c",
  writer: "testing 2",
  writeImage: "http://ehuhopgu.sn/dedirafan",
  blogImage: imagePath,
  content:
    "noun choose army course something pupil anywhere happily round familiar clothes unhappy roof hungry replace noon refer canal problem ordinary open policeman nervous arrange. spoken saved drove trunk leaving anyone health layers his pony surface plain blow proud pipe political real muscle cabin road married bicycle without century",
};

// blogImage:
// "file:///C:/Users/ThinkBig/Pictures/250788850016_status_f2a67f1e03b84d5dafdd02f17bfd56a5.jpg",
// comments:
//   "somebody cat or under doll take carbon against place element wing balance chain look poem apartment gun topic tired red force blew ourselves class",
// likes: "true",

export const updateBlogData = {
  title: "empty child giant solid queen pair heavy circus specific...",
  blogImage: imagePath,
  content:
    "duck bark different alike thou strange whispered radio organization recognize apart drop coast stream fallen composed cup hard letter basis bring interior air according",
};

/////////// SINGUP ////////////////
export const userSignupData = {
  name: "james",
  email: "james@email.com",
  password: "John@12!",
};

export const adminSignupData = {
  name: "john",
  email: "john@email.com",
  password: "John@12!",
  role: "admin",
};

/////////// LOGIN ////////////////
export const userLoginData = {
  email: "james@email.com",
  password: "John@12!",
};

export const adminLoginData = {
  email: "john@email.com",
  password: "John@12!",
};

/////////// QUERRY ////////////////
export const querryData = {
  name: "Francisco Simmons",
  email: "Francisco@cupo.pk",
  message:
    "follow missing tropical face many clean own job instrument tip manufacturing dirt division similar attached corn chose range general piece easily laugh colony food",
};

export const querryDataWithOutMessage = {
  name: "Francisco Simmons",
  email: "Francisco@cupo.pk",
};

/////////// comment ////////////////
export const commentDatas = {
  name: "niyibizi niyibize",
  email: "bi@ezhoz.sr",
  comment:
    "laid off these shaking practical earn information keep per highest machine simple establish dog frozen underline oxygen rabbit volume grass native strong young average",
};
