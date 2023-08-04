const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[Amazing CRUD]");

function create(content) {
    // save content on system
    fs.writeFileSync(DB_FILE_PATH, content);
    return content;
}

// [SIMULATION]
console.log(create("Task I'll do today!"));