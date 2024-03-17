import express from "express";
import 'dotenv/config'

const app = express()

let path = process.env.HTTP_STATIC;
let root = import.meta.dirname

app.use(express.json())
app.use(express.static(path))

app.get('/home', function (req, res) {
  res.sendFile(`${path}/index.html`, {root})
})
app.get('/api?', (req, res)=>{
  // http://127.0.0.1:5510/api?name=Andres&last_name=Lizarazo&age=35&gender=Masculino&post=Jefe&company=CampusLands
  let {name,last_name, age, gender} = req.query
  let json = {
    status: 200,
    dataClient: {name,last_name, age, gender},
    mensaje: "datos obtenidos"
  }
  res.status(200).send(json)
})
app.post('/api?',(req, res)=>{
  // http://127.0.0.1:5510/api
  // {
  //   "name": "Miguel",
  //   "last_name": "Castro",
  //   "age": 23,
  //   "gender": "Trainer"
  // }
  let {name,last_name, age, gender} = req.body
  let json = {
    status: 201,
    dataClient: {name,last_name, age, gender},
    mensaje: "datos obtenidos"
  }
  res.status(201).send(json)
})
app.put('/api/:cc',(req, res)=>{
// http://127.0.0.1:5510/api/123
  // {
  //   "name": "Jholver",
  //   "last_name": "Pardo",
  //   "age": 45,
  //   "gender": "Lider Trainer"
  // }
  let { params: { cc }, body: { name, last_name, age, gender } } = req;

  let json = {
    status: 202,
    dataClient: {cc, name,last_name, age, gender},
    mensaje: "datos obtenidos"
  }
  res.status(202).send(json)
})
app.delete('/api/:cc?',(req, res)=>{
  console.log(app._router.stack);
  res.status(200).send("Eliminado")
})

app.use((req, res) => {
  res.sendFile(`${path}/404.html`, {root})
})

app.listen({
  hostname: process.env.HTTP_HOSTNAME,
  port: process.env.HTTP_PORT
}, () => {
  console.log(`http://${process.env.HTTP_HOSTNAME}:${process.env.HTTP_PORT}`);
})




