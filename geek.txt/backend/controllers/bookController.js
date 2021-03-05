const data = require('./../../../data.json')


module.exports = {
    getBooks
};

const randPrice = [12.99, 14.99, 24.99, 30.99, 34.99, 9.99, 4.99, 19.99, 17.99, 39.99];

function getBooks(req, res){
    const bookData = data.results.lists;
    const bookList = {list: []};
    for(let i = 0; i < bookData.length; i++){
        const bookinfo = bookData[i].books;
        for(let j = 0; j < bookinfo.length; j++){
            let info = {
                "url": bookinfo[j].book_image,
                "title": bookinfo[j].title,
                "author":bookinfo[j].author,
                "publisher":bookinfo[j].publisher,
                "description": bookinfo[j].description,
                "price": randPrice[Math.floor(Math.random() * 10)]
            };
        bookList.list.push(info);
        }
    }  
    res.json(bookList)
}

