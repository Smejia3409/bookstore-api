const { PrismaClient } = require("@prisma/client");

//used for db CRUD operations
let db = new PrismaClient();

module.exports = db;
