const fs = require('fs/promises');
const path = './products.json';

class ProductManager {
    products = [];
    constructor( products=[]){
        this.products = products;
    }

    randomID(){
        return crypto.randomUUID();
    }
    async setProduct(product){
        try {
            await this.getProducts();
            product.id = this.randomID();
            this.products.push( product);
            const data = JSON.stringify(this.products, null, 2);
            
            await fs.writeFile(path, data);
            return product.id
        } catch (error) {
            console.error('No pudimos guardar el archivo');
        }
    }
    async getProducts(){
        try {
            const data = await fs.readFile(path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error('No pudimos leer el archivo')
        }
    }
    async getProductById(id){
        const list = await this.getProducts();
        const product = list.find( item => item.id == id);
        return product ? product : {};
    }
}
// las lista es solo a modo ejemplo
const lista = [1,2,3];
module.exports =  { ProductManager, lista };
/* Versión larga
module.exports =  { 
    ProductManager: ProductManager, 
    lista: lista 
};
*/
