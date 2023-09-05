import { gql } from "@apollo/client";

export  const getallquotes=gql`
query{
    quotes{
      _id
      name
      by{
        fname
        id
      }
    }
  }
`
export const myprofile=gql`
query
{
  user:myprofile{
    fname
    ltname
    emailid
    phoneno
    quotes{
      name
    }
    
  }
}`
export const otherprofile=gql`
query($userid:ID!){
 user:users(_id:$userid){

    _id,
    fname ,
    phoneno,
    ltname,
    emailid
    quotes{
      _id
      name
      by
    }
  
  }
}`