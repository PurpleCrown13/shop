import * as mysql from 'mysql2/promise';
import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hellafra_BigBoy'
    });

    app.get('/', (req, res) => {
        res.send('Welcome to the server!');
    });

    app.get('/api/data', async (req, res) => {
        try {
            const query = 'SELECT * FROM QWERTY';
            const [results] = await connection.query(query);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    });


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
})();
