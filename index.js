
//importação de pacotes
const express = require('express');
const mongoose = require('mongoose');


//iniciando a nossa aplicação
const app = express();

app.use(express.json());

//inicia conexão com MongoDB
mongoose.connect('mongodb://localhost/apirest', {useNewUrlParser: true});

const DespesaSchema = mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    data_vencimento: {
        type: Date,
        required: true
    },
    pago: {
        type: Boolean,
        required: true,
        default: false
    },
    data_pagamento: {
        type: Date,
        default: null
    },
    data_cadastro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

mongoose.model('Despesa', DespesaSchema);

const ReceitaSchema = mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    previsao_recebimento: {
        type: Date,
        required: true
    },
    pago: {
        type: Boolean,
        required: true,
        default: false
    },
    data_recebimento: {
        type: Date,
        default: null
    },
    data_cadastro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

mongoose.model('Receita', ReceitaSchema);



//rota raiz
app.get('/', (req, res) => {
    res.send("Seja bem vindo ao Profissão desenvolvedor, Antoniel!");
});


//GET /despesas
app.get('/despesas', async (req, res) => {

    const Despesa = mongoose.model('Despesa');
    const despesas = await Despesa.find();

    res.json(despesas);
});


//POST /despesas
app.post('/despesas', async (req, res) => {

    const Despesa = mongoose.model('Despesa');
    const aux = await Despesa.create(req.body);

    res.json(aux);
});

//GET /despesas/:id
app.get('/despesas/:id', async (req, res) => {

    const Despesa = mongoose.model('Despesa');
    const aux = await Despesa.findOne({_id: req.params.id});

    res.json(aux);
});

//PUT /despesas/:id
app.put('/despesas/:id', async (req, res) => {

    const Despesa = mongoose.model('Despesa');
    const aux = await Despesa.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});

    res.json(aux);
});

//DELETE /despesas/:id
app.delete('/despesas/:id', async (req, res) => {

    const Despesa = mongoose.model('Despesa');
    const aux = await Despesa.findOneAndDelete({_id: req.params.id});

    res.json(aux);
});



//Criação das rotas de receitas

//GET /receitas
app.get('/receitas', async (req, res) => {

    const Receita = mongoose.model('Receita');
    const receitas = await Receita.find();

    res.json(receitas);
});

//GET /receitas/:id
app.get('/receitas/:id', async (req, res) => {

    const Receita = mongoose.model('Receita');
    const aux = await Receita.findOne({_id: req.params.id});

    res.json(aux);
});

//POST /receitas
app.post('/receitas', async (req, res) => {

    const Receita = mongoose.model('Receita');
    const aux = await Receita.create(req.body);

    res.json(aux);
});

//PUT /receitas/:id
app.put('/receitas/:id', async (req, res) => {

    const Receita = mongoose.model('Receita');
    const aux = await Receita.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});

    res.json(aux);
});

//DELETE /receitas/:id
app.delete('/receitas/:id', async (req, res) => {

    const Receita = mongoose.model('Receita');
    const aux = await Receita.findOneAndDelete({_id: req.params.id});

    res.json(aux);
});

//inicia o servidor web do node js
app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
