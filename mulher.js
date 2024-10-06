const express = require('express')
const router = express.Router()

const app =  express()
const porta = 3333;

function mostraMulher(resquest,response){
    response.json({
        nome: 'Thaixx Machado',
        imagem:'https://media.licdn.com/dms/image/v2/D4D03AQHMUmXh72i-2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1671827062987?e=1733356800&v=beta&t=S_CbQKXBdLxtSsnLIjCp24KCy8bZwQIDGM8acuwjmZg',
        minibio: 'QA e Física'
    })
}
function mostraPorta(){
    console.log('Servidor criado e rodando na porta', porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)

