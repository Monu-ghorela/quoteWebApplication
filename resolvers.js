
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import JWT_SECRET from "./db/config"


import './db/quotes.js';
import './db/user.js';
const user = mongoose.model("users");
const quote=mongoose.model("quotes")
export const resolvers = {
    Query: {
        quotes: async() =>quote.find({}).populate("by","_id fname "),
        user: async() =>await user.find(),
        users:async (_, {_id}) =>await user.findOne({_id }),
        myprofile:async(_,args,{userid})=>{
            
            if(!userid){
                throw new Error("u have to login first")

            }
            return await user.findOne({_id:userid})
        }
        // books: () => books
    },
    Users: {
        quotes:async (ur) =>await quote.find({by:ur._id})
    },
    Mutation: {
        systemsignup: async (_, { usernew }) => {
            //     const _id = randomBytes(6).toString("hex");
            //     console.log(_id);
            //     console.log(usernew);
            //     users.push({


            //         _id: _id,
            //         ...usernew,
            //     }
            //     );
            //     console.log(users);
            //    let newuser=users.find(newuser=>newuser._id==_id);
            //    if(newuser)
            //    {
            //     console.log("this is the user "+newuser);
            //     return newuser
            //    }
           
            const usersexist = await user.find({ emailid: usernew.emailid });
        
            if (usersexist.length > 0) {
                throw new Error("user already exist with that email");
            }
            const hashedpassword = await bcrypt.hash(usernew.password, 12);
       
            const newuser = new user({
                ...usernew,
                password: hashedpassword,
            });
            return await newuser.save();


        },
        systemsignin: async (_, { signinuser }) => {
            const userexist = await user.find({ emailid: signinuser.emailid });
            if (!userexist) {
                throw new Error("user doesn't exist with that email")
            }

            const domatch = await bcrypt.compare(signinuser.password, userexist[0].password);

            if (!domatch) {
                throw new Error("email or password invalid");
            }
            const token = jwt.sign({ userid: userexist[0]._id }, process.env.JWT_SECRET);
            return { token };
        },
        createQuote:async (_, {name}, { userid }) => {
      
            if (!userid) {
                throw new Error("yoiu must loggeede in  ")

            }
            const newquote = new quote({
                name,
                by: userid
            })
            await newquote.save();
            return newquote;

        }

    }
}