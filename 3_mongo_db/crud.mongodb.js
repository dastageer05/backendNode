use("CrudDb")

db.createCollection("courses")

db.courses.insertOne({
    name: "dastagir",
    price: 0,
    assigment: 11,
    project: 5
})

db.courses.insertMany([
    { name: "dastagir", price: 0, assignment: 11, project: 5 },
    { name: "john", price: 10, assignment: 12, project: 6 },
    { name: "alice", price: 5, assignment: 13, project: 7 },
    { name: "bob", price: 20, assignment: 14, project: 8 },
    { name: "charlie", price: 15, assignment: 15, project: 9 },
    { name: "eve", price: 25, assignment: 16, project: 10 },
    { name: "frank", price: 30, assignment: 17, project: 11 },
    { name: "grace", price: 35, assignment: 18, project: 12 },
    { name: "heidi", price: 40, assignment: 19, project: 13 },
    { name: "ivan", price: 45, assignment: 20, project: 14 }
])


let a = db.courses.find({price: 0})

console.log(a.toArray())

db.courses.updateOne(
    {price: 0}, {$set:{price: 100}
})

db.course.deleteOne({price: 100})