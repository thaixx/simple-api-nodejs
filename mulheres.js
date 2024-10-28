const express = require('express')
const router = express.Router()
const cors = require('cors')
const conectaBancoDeDados = require('./bancoDeDados')// ligando o arquivo BD
conectaBancoDeDados() // chamando a fç que conecta o BD

const mulher = require('./mulherModel')

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333;


async function mostraMulheres(resquest, response) {
    try {
        const mulheresVindasDoBD = await mulher.find()
        response.json(mulheresVindasDoBD)
    } catch (erro) {
        console.log(erro)
    }

}
//POST
async function criaMulher(request, response) {
    const novaMulher = new mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

    } catch (erro) {
        console.log(erro)

    }
}
//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await mulher.findById(request.params.id)
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)

    } catch (erro) {
        console.log(erro)
    }
}
//DELETE
async function deletaMulher(request, response) {
   try{
        await mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso"})
   }catch(erro){
    console.log(erro)
   }    
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}

app.use(router.get('/mulheres', mostraMulheres))//rota GET
app.use(router.post('/mulheres', criaMulher))//rota POST
app.use(router.patch('/mulheres/:id', corrigeMulher)) //rota PATCH
app.use(router.delete('/mulheres/:id', deletaMulher)) //rota DELETE

app.listen(porta, mostraPorta)

