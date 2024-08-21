const path = require("path")
const express = require("express");
const multer = require("multer");

// const upload = multer({ dest: "uploads/"}) as such no use it crupt the uploaded image file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req,file,cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({storage})

const app = express()
const port = 3001

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));


app.get('/', (req, res) => {
    return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) =>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});

app.listen(port, ()=>  console.log(`app is listening at port ${port}`))