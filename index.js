const app = require("./server");

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});