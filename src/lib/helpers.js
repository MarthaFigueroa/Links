const bcrypt = require('bcryptjs');

const helpers = {}

helpers.encryptPassword = async (password) =>{
    //Generar un hash, ejecutar n veces el algoritmo
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) =>{
    try {
        return await bcrypt.compare(password, savedPassword);  //Retorna el resultado de la consulta
    } catch (e) {
        console.log(e);
    }
}

module.exports = helpers;