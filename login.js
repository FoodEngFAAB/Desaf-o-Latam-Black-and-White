const child = require('child_process')
const yargs = require('yargs')

//Define condiciones de acceso
const password = "123"
const argv = yargs
    .command('login', 'Acceso a la modificación de imagen',
        {password:
            {describe: 'pass: ',
                demand: true,
                alias: 'p',}},
        //Acceso a ejecución de index.js
        (args) => args.password == password
            ? child.exec('node index.js', (err, stdout) => {
                err ? console.log(err) : console.log(stdout)
            })
            : console.log('Password incorrecto. Inténtelo nuevamente.')
    )
    .help().argv