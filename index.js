const Jimp = require('jimp')
const chalk = require('chalk')
const http = require('http')
const url = require('url')
const fs = require('fs')

const port = 3000

//Levanta servidor
http.createServer((req, res) => {

    //Acceso a hoja de estilos CSS que se aplicarán al HTML
    if (req.url == '/style') {
        //Comprueba accesos
        //console.log(chalk.yellow.italic(`Accediendo a CSS\n`))
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.readFile('style.css', (err, css) => {
            res.end(css)
        })
    }
    //Acceso y lectura al y del archivo html (index.html)
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('index.html', 'utf8', (err, html) => {
            res.end(html)
            //console.log(chalk.yellow.bold(`Acceso y lectura del ${html}\n`))
        })
    }
    //Acceso a la modificación de imagen
    if (req.url.includes('/jimpImg')) {
        const parameters = url.parse(req.url, true).query
        const urlImg = parameters.url
        Jimp.read(`${urlImg}`, (err, img) => {
            //console.log(chalk.bgWhite.blue.bold(`Modificando IMG\n`))
            img
                //Redimensiona a 350px, escala de grises a 60%
                .resize(350, Jimp.AUTO)
                .greyscale()
                .quality(60)
                //Guarda imagen modificada
                .writeAsync('jimpedImg.jpg')
                .then(() => {
                    //Devuelve imagen modificada
                    //Primero lee
                    fs.readFile('jimpedImg.jpg', (err, img) => {
                        //Luego imprime en pantalla
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                        res.end(img)
                        //console.log(chalk.bgWhite.red.bold(`Devuelve imagen\n`))
                    })
                })
        })
    }
}).listen(`${port}`, () => { console.log(chalk.bgGray.black.italic.bold(`\nAcceso a puerto ${port}\n`)) })
