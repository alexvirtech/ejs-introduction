const express = require('express');
const app = express();
const port = 7000;

const minifyHTML = require('express-minify-html-2');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

app.use('/inc', express.static(__dirname + '/public/inc'));

var products = ['apple', 'pear', 'potato'];

app.get('/', (req, res) => {
    res.render('main',  //instead of: res.render(__dirname + '/views/main'
        {
            title: 'Products',
            footer: 'All rights reserved to <b class="text-primary">Alex</b>&copy;',
            message: 'Product List',
            products: products,
            name: 'Anna'
        })
})

// other examples
app.get('/users/:userId', function (req, res) {
    res.send(req.params);
})

app.get('/user/:userId/pass/:password', function (req, res) {
    res.send(req.params);
})

app.get('/*', function (req, res) {
    res.send(req.params[0]);
})

app.listen(port, () => {
    console.log('Server started on: ' + port);
});