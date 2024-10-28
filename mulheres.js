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

// const mulheres = [
//     {
//         id: '1',
//         nome: 'Thaixx Machado',
//         imagem:'https://media.licdn.com/dms/image/v2/D4D03AQHMUmXh72i-2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1671827062987?e=1733356800&v=beta&t=S_CbQKXBdLxtSsnLIjCp24KCy8bZwQIDGM8acuwjmZg',
//         minibio: 'QA e Física',
//     },
//     {
//         id: '2',
//         nome: ' Simara Conceição',
//         imagem:'https://bit.ly/3LJIyOF',
//         minibio: 'Desenvolvedora e instrutora',
//     },
//     {
//         id: '3',
//         nome: 'Iana Chan',
//         imagem:'https://bit.ly/3JCXBqP',
//         minibio: 'CEO & Founder da PrograMaria',
//     }
// ]
//GET


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

