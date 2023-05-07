import fs from 'fs';

const itemsWithImage = JSON.parse(fs.readFileSync(`./another.data.json`, { encoding: 'UTF-8' }));
fs.readdirSync(`../api/people`)
    .forEach(fileName => {
        const data = fs.readFileSync(`../api/people/${fileName}`, { encoding: 'UTF-8' })
        const items = JSON.parse(data);
        if (Array.isArray(items))
        {
            items.forEach((item, index) => {
                const externalItem = itemsWithImage.find(i=>i.name.toLowerCase() === item.name.toLowerCase());
                delete item.species;
                if(externalItem) {
                    item.wiki = externalItem.wiki;
                    item.image = externalItem.image;
                    item.species = externalItem.species;
                    item.homeworld = externalItem.homeworld;
                    item.born = externalItem.born;
                    item.bornLocation = externalItem.bornLocation;
                    item.died = externalItem.died;
                    item.diedLocation = externalItem.diedLocation;
                }
            })
        } else {
            const externalItem = itemsWithImage.find(i=>i.name.toLowerCase() === items.name.toLowerCase());
            delete items.species;
            if(externalItem) {
                items.wiki = externalItem.wiki;
                items.image = externalItem.image;
                items.species = externalItem.species;
                items.homeworld = externalItem.homeworld;
                items.born = externalItem.born;
                items.bornLocation = externalItem.bornLocation;
                items.died = externalItem.died;
                items.diedLocation = externalItem.diedLocation;
            }
        }

        fs.writeFileSync(`../api/people/${fileName}`, JSON.stringify(items));
    })
