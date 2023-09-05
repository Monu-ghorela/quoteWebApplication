import { gql } from "@apollo/client";

export  const getuser=gql`

mutation signup($usernew:userinput!){
    systemsignup(usernew:$usernew){
    
     fname
     }
  }

`
export const loginuser=gql`
mutation loginuser($user:inputforuser!){
  systemsignin(signinuser:$user){
    token
  }
}
`
export const createQuote=gql`
mutation ($name:String!){
  createQuote(name:$name){
    by
    name
  }
}`