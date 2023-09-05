import { mongoose } from "mongoose";
mongoose.connect("mongodb://localhost:27017/Graphql");
const quotesScema = new mongoose.Schema({
    name: {

        type: String,
        reuired: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

})

export default mongoose.model("quotes", quotesScema)