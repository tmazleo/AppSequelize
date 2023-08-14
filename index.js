const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const { where } = require("sequelize");
const db = require("./models/db");

const app = express();

//config
    //template eng
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',runtimeOptions: {
    allowProtoPropertiesByDefault: true,allowProtoMethodsByDefault: true,
    }
    }));
    app.set('view engine', 'handlebars');
    
    //body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());
    //conexao com db


//rotas

    app.get('/', (req, res) => {
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            res.render('home', {posts: posts})
        }).catch((error) => {
            console.error('Erro ao buscar os posts:', error);
            res.status(500).send('Erro Interno do Servidor');
        });
    })
    app.get('/cad', (req, res) => {
        res.render('form'); //renderizar o arquivo
    });
    app.post('/add', (req, res) => {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(() => {
            res.redirect('/');
        }).catch((erro) => {
            res.send("houve um erro: "+erro);
        })
    });
    app.get('/deletar/:id', (req, res) => {
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            res.render('home');
        }).catch((err) => {
            res.send("Erro no código" + err)
        })
    })

app.listen(8081, () => {
    console.log("Servidor rodando, url: http://localhost:8081");
});