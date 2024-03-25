import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBlogInputi:
 *      type: object
 *      required:
 *        - title
 *        - writer
 *        - blogImage
 *        - content
 *      properties:
 *        title:
 *          type: string
 *          default: guide company eye fast pie bee...
 *        writer:
 *          type: string
 *          default: Doe mon
 *        blogImage:
 *          type: string
 *          default: www.kfsdfupnmasnfdsf.com
 *        content:
 *          type: string
 *          default: mail finally till information coach twice dried recent broad political birth social whose star ship smell concerned drew new card half corn means lot
 *    CreateBlogInput:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        writer:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

// title: { type: String, required: true },
const blogSchema = new Schema(
  {
    // title: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    writer: { type: String, required: true },
    writeImage: { type: String },
    blogImage: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
