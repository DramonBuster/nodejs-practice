const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const productsPath = path.join(__dirname, "data/products.js");

// TODO: задокументировать каждую функцию
async function listAll() {
    // ...твой код
    try {
        const contactsList = JSON.parse(await fs.readFile(productsPath));

        return contactsList;
    } catch (error) {
        return error.message;
    }
}

async function getProductById(contactId) {
  // ...твой код
    const contactsList = await listContacts();
    const searchedContact = contactsList.find(contact => contact.id === `${contactId}`.toString());
    
    if (!searchedContact) {
        return null;
    }

    return searchedContact;
}

async function removeProduct(contactId) {
  // ...твой код
    const contactsList = await listContacts();
    const indexOfContact = contactsList.findIndex(contact => contact.id === contactId.toString());
    
    console.log("Removing contact:");
    console.table(contactsList[indexOfContact]);

    contactsList.splice(indexOfContact, 1);
    await fs.writeFile(productsPath, JSON.stringify(contactsList, null, 2));
    
    return contactsList;
}

async function addProduct(name, email, phone) {
  // ...твой код
    const contactsList = await listContacts();
    const newContact = {id: v4(), name, email, phone };
    
    contactsList.push(newContact);

    await fs.writeFile(productsPath, JSON.stringify(contactsList, null, 2));
    
    return contactsList;
}

module.exports = {
    listAll,
    getProductById,
    addProduct,
    removeProduct
}