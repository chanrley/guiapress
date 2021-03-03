const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//view engine
app.set("view engine", "ejs");

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão ok")
    }).catch((error) => {
        console.log(error);
    });


app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'desc']
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
   
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("App rodando");
});