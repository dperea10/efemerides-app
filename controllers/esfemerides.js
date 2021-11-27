const {
    response,
    request
} = require('express');
const path = require('path');
const fs = require('fs');
const _ = require('lodash')

const url = `${process.env.URL_API}`;
console.log(url)

const getEsfemeridesResult = (res = response) => {
    let result = []
    try {

        fs.readFile('./esfemerides.json', 'utf-8', (err, data) => {
            if (data) {
                const info = {
                    esfemeridesApi: JSON.parse(data),
                    size: data.length
                }
                result = res.status(200).json(info);
            } else {
                result = res.status(500).json(err);
            }
        });

    } catch (error) {
        res.status(500).json(error);
    }

    return result
};

const createEsfemerides = async (req = request, res = response) => {

    let {
        title,
        content,
        image,
        date,
        mounth,
        categorie
    } = req.body;

    let args = {
        id: Math.floor(Math.random() * 1000000),
        title: title,
        content: content,
        image: image,
        date: date,
        mounth: mounth,
        categorie: categorie
    }

    try {
        fs.readFile('esfemerides.json', 'utf-8', (err, data) => {

            let allDataJson = JSON.parse(data)
                allDataJson.data.push(args)
            if (allDataJson) {
                fs.writeFile('esfemerides.json', JSON.stringify(allDataJson, null, 2), {
                    flag: 'w+'
                }, error => {
                    if (err) {
                        res.status(500).json(error);
                    } else {
                        let dataReponse = fs.readFileSync('esfemerides.json', 'utf-8')
                        res.status(200).json(JSON.parse(dataReponse));
                    }
                });
            } else {
                res.status(500).json(err);
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateEsfemerides = (req = request, res = response) => {

    let { id } = req.params;
    let {
        title,
        content,
        image,
        date,
        mounth,
        categorie
    } = req.body;

    let args = {
        id,
        title: title,
        content: content,
        image: image,
        date: date,
        mounth: mounth,
        categorie: categorie
    }

    try {
    
        fs.readFile('esfemerides.json', 'utf-8', (err, data) => {
            if (data) {
                let allDataJson = JSON.parse(data)

                let filterIdArray = (array, key, value) => {
                    return array.filter( object => {
                        return object[key] == value;
                    });
                };
                let resultResponse = filterIdArray(allDataJson.data, 'id', id)
                let result =   resultResponse.map(function(dato){
                    if(dato.id == id){
                        dato.title = args.title
                        dato.content = args.content
                        dato.image = args.image
                        dato.date = args.date
                        dato.mounth = args.mounth
                        dato.categorie = args.categorie
                    }
                    return dato;
                })
                allDataJson.data.push(result)
                if (allDataJson) {
                    fs.writeFile('esfemerides.json', JSON.stringify(allDataJson, null, 2), {
                        flag: 'w+'
                    }, error => {
                        if (err) {
                            res.status(500).json(error);
                        } else {
                            let dataReponse = fs.readFileSync('esfemerides.json', 'utf-8')
                            res.status(200).json(JSON.parse(dataReponse));
                        }
                    });
                } else {
                    res.status(500).json(err);
                }
                
                res.status(200).json(resultResponse);

            } else {
                res.status(500).json(err);
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteEsfemerides = (req = request, res = response) => {

    try {

        fs.readFile('esfemerides.json', 'utf-8', (err, data) => {
            if (data) {
                const info = {
                    esfemeridesApi: JSON.parse(data),
                    size: data.length
                }
                res.status(200).json(info);
            } else {
                res.status(500).json(err);
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getEsfemeridesResult,
    createEsfemerides,
    updateEsfemerides,
    deleteEsfemerides

}