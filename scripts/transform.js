import fs from 'fs';

fs.readdirSync(`../api/vehicle`)
    .forEach(fileName => {
        const data = fs.readFileSync(`../api/vehicle/${fileName}`, { encoding: 'UTF-8' })
        const [index] = fileName.split('.');

        const items = JSON.parse(data);
        if(Array.isArray(items)) {
            items.forEach((item, index) => {
                delete item.url;
                item.id = index + 1;
            })
        } else {
            delete items.url;
            items.id = +index;
        }

        fs.writeFileSync(`../api/vehicle/${fileName}`, JSON.stringify(items));
    })
