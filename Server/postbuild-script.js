const path = require("path")
const fsExtra = require("fs-extra")

fsExtra.copy(path.join(__dirname, "src", "public"), path.join(__dirname, "build", "public"))
fsExtra.copy(path.join(__dirname, "src", "adobe-credentials"), path.join(__dirname, "build", "adobe-credentials"))
