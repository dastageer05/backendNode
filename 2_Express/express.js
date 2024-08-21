





//this is made to understand express post man only main file is changing and data is changing



const express = require('express');
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()
const port = 3000


//middlewar
app.use(express.urlencoded({extended:false}))

//Routes

//GET /users - HTML document render for mobile user (main it for not browser)
app.get("/users", (req, res)=>{
  const html = `
  <ul>
      ${users.map((user)=>{
        return `<li>${user.first_name}</li>`
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
app.get("/api/users", (req, res)=>{
  res.setHeader('myName', 'Dp')
  // console.log(req.header)
  return res.json(users)
})

app.post('/api/users', (req, res)=>{
  //crete new user
  //me : body come from postman 
  const body = req.body;
  users.push({...body, id: users.length+1})
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
    return res.status(201).json({status:"success", id: users.length});
  })
})

//get /api/users/1 - get the user with id 1 dynamic handling 
// app.get("/api/users/:id", (req, res)=>{
//   const id = Number(req.params.id)
//   const user = users.find((user) => user.id ===id);
//   return res.json(user);
// })

//similarly for put patch and for delete we need id and every one have same path so me merge
app
  .route("/api/users/:id")
  .get((req, res)=>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id ===id);
    return res.json(user);
  })
  .put((req, res) =>{
    return res.json({status : 'pending'})
  })
  .patch((req, res) =>{
    // edit the id of user
    return res.json({status : 'pending'})
  })
  .delete((req, res) =>{
    // delete the id
    return res.json({status : 'pending'})
  })

//piyush say do patch delete by your own it is eassy

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})