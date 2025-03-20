const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Headers', 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/recipes", (req, res, next) => {
    const recipe = req.body;
    console.log(recipe);
    res.status(201).json({
        message: 'Recipe added successfully.'
    });
});

app.get('/api/recipes', (req, res, next) => {
    const recipes = [
        {
            name: 'steak and potatoes', 
            description: 'is what it is',
            imagePath: '/here', 
            ingredients: []
        },
        {
            name: 'chicken and rice', 
            description: 'is what it is',
            imagePath: '/here', 
            ingredients: []
        }
    ];
    res.status(200).json({
        message: 'Recipes fetched successfully!',
        recipes: recipes
    });
});

module.exports = app;