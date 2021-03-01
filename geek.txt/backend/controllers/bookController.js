const data = require('./../../../data.json')


module.exports = {
    getBooks
};


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
                "height": bookinfo[j].book_image_height
            };
        bookList.list.push(info);
        }
    }  
    res.json(bookList)
}

