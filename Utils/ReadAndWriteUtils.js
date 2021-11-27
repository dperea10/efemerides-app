const fs = require('fs');
const _ = require('lodash')
const apiData = 'esfemerides.json'

class ReadAndWriteUtil {

    static searchMethodUtil() {
        let resultData = []
        try {
  
            fs.readFile(apiData, 'utf-8', (err, data) => {
                if (data) {
                    const info = {
                        esfemeridesApi: JSON.parse(data),
                        size: data.length
                    }
                    resultData = info;
                } else {
                    resultData = err;
                }
            });
        } catch (error) {
            resultData = JSON.parse(error);
        }
        return resultData
    }

    async updateMethodUtil({
        id,
    }) {
        try {
            fs.readFile('esfemerides.json', 'utf-8', (err, data) => {
                if (data) {
                    let allDataJson = JSON.parse(data)

                    let filterIdArray = (array, key, value) => {
                        return array.filter(object => {
                            return object[key] === value;
                        });
                    };
                    const resultResponse = filterIdArray(allDataJson.data, 'id', id)

                    res.status(200).json(resultResponse);

                } else {
                    res.status(500).json(err);
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = ReadAndWriteUtil