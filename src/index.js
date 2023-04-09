const app = require('./app');
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const cors = require('cors');

const swaggerDocument = YAML.parse(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuração do CORS
app.use(cors());

app.listen(3001, () => {
  console.log('Swagger UI está disponível em http://localhost:3001/api-docs');
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/expenses', async (req, res) => {
  try {
    const snapshot = await db.collection('expenses').get();
    const expenses = [];
    snapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.send(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar despesas.' });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
