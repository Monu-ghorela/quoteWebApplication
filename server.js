import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer
}

    from "apollo-server-core";
import dotenv from 'dotenv';
import Jwt from "jsonwebtoken";
console.log(process.cwd());
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemagql.js";
import express from "express"
import http from "http"
import path from 'path'
import { error } from "console";
const app = express();
const httpServer = http.createServer(app);
if (process.env.NODE_ENV !== "production") {
    
    dotenv.config();
}
const port = process.env.port || 4000;

app.use(express.static('client/build'));
if (process.env.NODE_ENV == "production") {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(),'client','build','index.html'))
    });

}





// const books = [{
//     title: "The Great Gatsby", author: "F. Scott Fitzgerald"
// },
// {

//     title: "The hii", author: "F. Scott Fitzgerald"
// }
// ]

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const { authorization } = req.headers;


        const { userid } = Jwt.verify(authorization, process.env.JWT_SECRET);

        return { userid }
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
            ApolloServerPluginLandingPageGraphQLPlayground() :
            ApolloServerPluginLandingPageDisabled(),

    ]
})
await server.start();
server.applyMiddleware({
    app,
    path: '/graphql'
});
httpServer.listen({ port }, () => {

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
})
