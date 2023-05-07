import fetch from 'node-fetch';
import fs from 'fs';

async function fetchData(type) {
    const items = [];
    let isEnd;
    let page = 1;
    do {
        const response = await fetch(`https://swapi.py4e.com/api/${type}/?page=${page}`)
        const data = await response.json();
        items.push(...data.results);
        isEnd = !data.next;
        page++;
    } while (!isEnd)
    return items;
}

function createFiles(folder, items) {
    fs.writeFileSync(`api/${folder}/all.json`, JSON.stringify(items));
    items.forEach((item, index) => {
        fs.writeFileSync(`api/${folder}/${index + 1}.json`, JSON.stringify(item));
    })

}

async function run() {
    const map = [['films', 'film'], ['people', 'people'], ['planets', 'planet'], ['species', 'species'], ['starships', 'starship', 'vehicles', 'vehicle']]
    map.forEach(async ([endpoint, folder]) => {
        const items = await fetchData(endpoint);
        createFiles(folder, items);
    })
}


run();
