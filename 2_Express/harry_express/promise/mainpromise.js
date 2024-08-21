import fs from "fs/promises"

let a = await fs.readFile("harry.txt")

let b = await fs.appendFile("harry.txt",
"\n this is amazing promise"
)
console.log(a.toString())