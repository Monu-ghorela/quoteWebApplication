import { mongoose } from "mongoose";
mongoose.connect("mongodb://localhost:27017/Graphql");
const userscema = new mongoose.Schema({
    fname: { type: String, required: true },
    ltname: { type: String, required: true },
    password: { type: String, required: true },
    emailid: { type: String, unique: true, required: true },
    phoneno: { type: String, default: "null",required:true },
    address: { type: String, required: true },
})
export default mongoose.model("users", userscema)