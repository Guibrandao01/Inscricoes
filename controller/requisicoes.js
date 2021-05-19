const sql = require('mssql');
const express = require('express');
const app = express();
const config = require ('../config/database.js');
const connStr = config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require('cors')
const moment = require('moment'); 

app.use(cors())
module.exports = {
  async index(req, res) {
    sql.connect(connStr, function () {
      const request = new sql.Request();
      request.query('select * FROM [RECEITA].[automacao].[INSCRICAO_DEBITO]', function (err, recordset) {
        if (err) console.log(err);
        res.end(JSON.stringify(recordset));
      });
    });
  },


  async usuario(req, res) {
    sql.connect(connStr, function () {
      const request = new sql.Request();
      const intRequest = 'SELECT * FROM [RECEITA].[automacao].[ACORDAO_SELECIONADO] WHERE Id = ' + req.params.Id;
      request.query(intRequest, function (err, recordset) {
        if (err) console.log(err);
        res.end(JSON.stringify(recordset));

      });
    });
  },

  async post(req, res) {

    sql.connect(connStr, function () {
      const request = new sql.Request();
      const {
        Ano ,
        Acordo_AutoInfracao,
        Processo,
        Apartirde,
        Inclusao = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

      } 
      = req.body

      request.query(`insert into [RECEITA].[automacao].[INSCRICAO_DEBITO] (Ano,Acordo_AutoInfracao,Processo,Apartirde,Inclusao) VALUES
       (${Ano},'${Acordo_AutoInfracao}','${Processo}','${Apartirde}','${Inclusao}')`,
        res.json());
      console.log('dados inseridos com sucesso')
    });
  }
}

