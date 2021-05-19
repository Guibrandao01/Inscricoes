const express = require('express');
const app = express();         
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 8080; 
const requisicao = require('./controller/requisicoes');
const router = express.Router();
const cors = require('cors')
app.use(cors())



router.get('/',cors(), requisicao.index)
// router.get('/clientes/:nrCadastro',cors(), requisicao.usuario)
router.post('/',cors(),requisicao.post)
app.use('/', router);


app.listen(port);
console.log('API funcionando!');



