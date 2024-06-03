import { app } from './config/expressConfig'; // Importar a configuração do Express
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const PORT = process.env.PORT || 3000; // Definir a porta do servidor

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
