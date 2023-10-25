import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


app.post('/realizar-pix', async (req, res) => {
  try {
   
    const senderId = req.body.senderId; 
    const recipientId = req.body.recipientId; 
    const value = req.body.value;

 
    const postData = {
      senderId: senderId,
      recipientId: recipientId,
      value: value,
   
    };

    const response = await fetch('http://177.44.248.24/pix-api/pix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao fazer a requisição POST:', error);
    res.status(500).json({ error: 'Erro ao fazer a requisição POST' });
  }
}
);

app.get('/buscar-usuarios', async (req, res) => {
  try {
    const response = await fetch('http://177.44.248.24/pix-api/users/');
    const usuarios = await response.json();
   
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});


app.get('/consultar-pix/:userId/:type', async (req, res) => {
  const userId = req.params.userId;
  const type = req.params.type;

  try {
    const apiUrl = `http://177.44.248.24/pix-api/pix/${userId}/${type}`;
    const response = await fetch(apiUrl);
    const pixData = await response.json();
    res.json(pixData);
  } catch (error) {
    console.error('Erro ao consultar PIX:', error);
    res.status(500).json({ error: 'Erro ao consultar PIX' });
  }
});








