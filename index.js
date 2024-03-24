"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
app_1.default.listen("3001", function () {
    console.log("Server listening on port 3001");
});
