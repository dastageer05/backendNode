const express = require('express');
const fs = require("fs")
const mongoose = require("mongoose")

const app = express()
const port = 3000

//Connection
mongoose
  .connect('mongodb://localhost:27017/backPiyush')
  .then(()=>console.log("mongodb connected"))
  .catch(err => console.log('mongodb conn err', err));

//Schema using mongoose
const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    require: true,
  },
  last_name:{
    type: String,
  },
  email:{
    type: String,
    require: true,
    unique: true,
  },
  gender:{
    type: String,
    require: true,
  },
  jobTitle:{
    type: String,
  }
},{timestamps: true} 
)

const User = mongoose.model("user", userSchema)
//default the collection name user become users 

//middlewar
app.use(express.urlencoded({extended:false}))

//Routes
//GET /users - HTML document render for mobile user (main it for not browser)
app.get("/users", async (req, res)=>{
  const allDbUsers = await User.find({});
  const html = `
  <ul>
      ${allDbUsers.map((user)=>{
        return `<li>${user.first_name} - ${user.email}</li>`
      }).join("")}
  </ul>
  `;
  //shortcut tech of above
  // const html = `
  // <ul>
  //     ${users.map(user => `<li>${user.first_name}</li>`).join("")}
  // </ul>`;

  res.send(html);
})

//GET /api/users - list all user in JSON format for like browser (react type website)
app.get("/api/users", async(req, res)=>{
  const allDbUsers = await User.find({});

  res.setHeader('myName', 'Dp')
  // console.log(req.header)
  return res.json(allDbUsers)
})

app.post('/api/users', async (req, res)=>{
  //crete new user
  //me : body come from postman 
  const body = req.body;
  
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  // console.log('result', result)
  return res.status(201).json({msg: "success"});
});

//get /api/users/1 - get the user with id 1 dynamic handling 
// app.get("/api/users/:id", (req, res)=>{
//   const id = Number(req.params.id)
//   const user = users.find((user) => user.id ===id);
//   return res.json(user);
// })

//similarly for put patch and for delete we need id and every one have same path so me merge
app
  .route("/api/users/:id")
  .get(async(req, res)=>{
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .put((req, res) =>{
    return res.json({status : 'pending'})
  })
  .patch(async (req, res) =>{
    // edit the id of user
    await User.findByIdAndUpdate(req.params.id, {last_name: "Changed"})
    return res.json({status : 'success'})
  })
  .delete(async (req, res) =>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : 'Success'})
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})