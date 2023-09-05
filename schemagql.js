import { gql } from "apollo-server-express";
export const typeDefs = gql`
type Query{
      user:[Users],
    quotes:[Quotewithname],
    users(_id:ID!):Users,
    myprofile:Users
    
}
type Quotewithname{
    _id:ID!
    name:String
    by:IDname
}
type IDname{
    id:String
    fname:String 
}
type Mutation{
    systemsignup(usernew:userinput!):Users,
    systemsignin(signinuser:inputforuser!):Token,
    createQuote(name:String!):Quotes,
}
type Token{
    token:String,
}
input inputforuser{
    emailid:String!
    password:String!

}
input userinput{
    fname:String!
    ltname:String!
    password:String!
    emailid:String!
    phoneno:String!
    address:String!
}

type Users{
    _id:ID!,
    fname:String
    ltname:String
    password:String
    emailid:String
    phoneno:String
    address:String
    quotes:[Quotes]
  
}
type Quotes{
    _id:ID!
    name:String
    by:ID
    
}

`;
