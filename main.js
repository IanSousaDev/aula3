import { log } from 'console';
import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", async (req, res) => {
  res.send('oi sumida');

  res.end();
});

app.post("/adicionar_usuario", async (req, res) => {
  const { email, senha } = req.body

  const dados = await readFile('data.json');

  const usuarios = JSON.parse(dados)
  
  for(let i=0; i < usuarios.length; i++){
    if(email === usuarios[i].email){
      return res.status(201).json({erro: 'usuário já cadastrado'})
    }
  }



  usuarios.push({ email, senha});

  await writeFile('data.json', JSON.stringify(usuarios));
  res.status(201).json({mensagem: 'Usuário criado com sucesso!'});

  
  
});


app.listen(3300)