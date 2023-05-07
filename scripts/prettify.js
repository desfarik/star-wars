import fs from 'fs';

fs.readdirSync('../api').forEach(folder => {
    fs.readdirSync(`../api/${folder}`)
        .forEach(fileName => {
            const data = fs.readFileSync(`../api/${folder}/${fileName}`, { encoding: 'UTF-8' })
            fs.writeFileSync(`../api/${folder}/${fileName}`, JSON.stringify(JSON.parse(data),null, 4));
        })
});
