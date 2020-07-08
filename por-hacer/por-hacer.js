const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Ocurrio un error', err);

        /// console.log('se creo exitosamente');

    });
}

const cargarBD = () => {

    try {
        // throw "x"
        listadoPorHacer = require('../db/data.json');
        //throw "haha"
    } catch (error) {
        //console.log('Ocurrio un error', error);
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {

    //listadoPorHacer = require('../db/data.json');
    cargarBD();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarBD();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

let borrar = (descripcion) => {

    cargarBD();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}