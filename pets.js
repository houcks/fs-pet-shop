#!/usr/bin/env node
const fs = require('fs');
const subcommand = process.argv[2];

switch (subcommand) {
    case 'read':
        readText();
        break;
    case 'create':
        create();
        break;
    case 'update':
        update();
        break;
    case 'destroy':
        destroy();
        break;
    default:
        console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit(1);
}

/*
function readJSON(){
    fs.readFileSync('pets.json', 'utf-8', (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        return JSON.parse(data)
    });
}*/

function readText() {
    let index = process.argv[3];
    //let animals = readJSON();
    //console.log(animals)
    fs.readFile('pets.json', 'utf-8', (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        let animals = JSON.parse(data)
        if(!index){
            console.log(animals)
        }
        else if (!animals[index]) {
            console.error('No animal exists at index.')
            process.exit(1);
        }
        else{
            console.log(animals[index])
        }
        
    });
}

function create() {
    if (process.argv.length > 5) {
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            let animals = JSON.parse(data)
            let animal = {
                age: parseInt(process.argv[3]),
                kind: process.argv[4],
                name: process.argv[5]
            }
            animals.push(animal);
            fs.writeFile('pets.json', JSON.stringify(animals), function (error) {
                if (error) throw error;
            });
        });
    }
    else{
        console.error('Usage: node pets.js create AGE KIND NAME')
    }
}

function update(){
    if (process.argv.length > 6) {
        let index = process.argv[3]
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            if (error) throw error;
            let animals = JSON.parse(data)
            let animal = {
                age: parseInt(process.argv[4]),
                kind: process.argv[5],
                name: process.argv[6]
            }
            animals.splice(index, 1, animal);
            fs.writeFile('pets.json', JSON.stringify(animals), function (error) {
                if (error) throw error;
            });
        });
    }
    else{
        console.error('Usage: node pets.js update INDEX AGE KIND NAME')
    }
}

function destroy(){
    if (process.argv.length > 3) {
        console.log(process.argv.length)
        let index = process.argv[2]
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            if (error) throw error;
            let animals = JSON.parse(data)
            animals.splice(index, 1);
            fs.writeFile('pets.json', JSON.stringify(animals), function (error) {
                if (error) throw error;
            });
        });
    }
    else{
        console.error('Usage: node pets.js destroy INDEX')
    }
}

