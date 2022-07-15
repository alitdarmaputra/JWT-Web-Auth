const app = require("./server");
let port = 4000;
app.listen(port, () => {
    console.log("App is listening on port", port);
});