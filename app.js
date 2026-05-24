const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];
let nextId = 1;

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (users.find(user => user.email === email)) {
        return res.status(400).json({message: 'User already exists'});
    }
    const user = { id: nextId++, username, email, password };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username, email } });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', userId: user.id });
});

app.get('/search', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: 'Provide username as query param, e.g. /search?username=john' });
    }
    const results = users
        .filter(u => u.username.toLowerCase().includes(username.toLowerCase()))
        .map(u => ({ id: u.id, username: u.username, email: u.email }));
    res.status(200).json({ count: results.length, results });
});

app.put('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { email, password } = req.body;
    if (email) user.email = email;
    if (password) user.password = password;
    res.status(200).json({ message: 'Profile updated', user: { id: user.id, username: user.username, email: user.email } });
});
app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(index, 1);
    res.status(200).json({ message: `User ${id} deleted successfully` });
});

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});