const { ProductManager} = require('./ProductManager.js');
const http = require('http');

const port = 3000;
let clientes = 0;

const admin = new ProductManager();

const server = http.createServer(  (request, response ) => {
    const url = request.url;
    const method = request.method;
    let body = '';
    let status = 200;
    let content = 'text/html';

    console.log( url, method);

    if( url == '/'){
        body = '<h1>Hola desde NodeJS - Servidor</h1>'
        status = 200;
    } else if ( url == '/products'){



        status = 200;
        content = 'application/json';
        const data = { name: 'Tv', price: 340};
        body += JSON.stringify(data);

    } else if ( url == '/contact'){
        body = '<h1>Formularios e contactos</h1>'

    } else {
        status = 404;
        body = '<h1> Error 404 | Página web No encontrada </h1>';
    }


    //content = 'application/json';


    response.writeHead( status, { 'content-type': content });
    response.end(body);
    console.log(`Cliente conctados ${clientes}`);
    clientes++;
});

server.listen( port, () => { console.log(`Servidor Web en el puerto ${port}`)});

console.log('fin del Script');