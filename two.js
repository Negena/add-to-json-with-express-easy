const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req,res) => {
    res.sendFile("indexx.html", {root: __dirname})
})

app.get("/all", (req,res) => {
    fs.readFile("2.json", "utf-8", (err, data) => {
        data = JSON.parse(data)
        if (err) res.status(404).send(err)
        //res.send(data)
        res.json(data)
    })
})
let names = {
    "name": "wrong", 
    "age": "infinite"
}
app.post("/", async(req,res) => {
    const {name, age} = req.body 
    if (!name || !age) {
        return res.redirect("/")
    }
    const arr = {
        "name": name, 
        "age": age
    }
    let data = await fs.readFileSync("2.json")
    let json = JSON.parse(data)
    json.push(arr)

    await fs.writeFileSync("2.json", JSON.stringify(json))
    res.redirect("/all")
 
})

app.listen(3000, () => {
    console.log("works")
})