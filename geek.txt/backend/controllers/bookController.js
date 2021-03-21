// const data = require('./../../../data.json')
const Book = require("../models/books.model");

module.exports = {
    getBooks,
    getABook
};

// const randomAuthorInfo = "Officia anim voluptate ad ea esse. Fugiat magna laborum qui cupidatat adipisicing. Veniam ad Lorem officia labore ad id. Magna aliqua exercitation et veniam. Quis ex consequat aliqua exercitation cupidatat. Consectetur sunt laboris tempor consequat officia est excepteur culpa quis deserunt qui excepteur do."
// const randPrice = [12.99, 14.99, 24.99, 30.99, 34.99, 9.99, 4.99, 19.99, 17.99, 39.99];
// const genreOptions = ["Fantasy", "Historical Fiction", "Horror", "Romance", "Sci-Fi", "Autobiographies", "History", "Action", "Fiction" ];

function getBooks(req, res){

    Book.find({}).then(val => res.json(val)).catch(err => res.json(err));


    // const bookData = data.results.lists;
    // const bookList = [];
    // for(let i = 0; i < bookData.length; i++){
    //     const bookinfo = bookData[i].books;
    //     for(let j = 0; j < bookinfo.length; j++){
    //         let info = {
    //             "coverUrl": bookinfo[j].book_image,
    //             "title": bookinfo[j].title,
    //             "author":bookinfo[j].author,
    //             "authorBio": randomAuthorInfo,
    //             "publisher":bookinfo[j].publisher,
    //             "description": bookinfo[j].description ? bookinfo[j].description : randomAuthorInfo,
    //             "rating": Math.floor(Math.random() * 5) + 1,
    //             "price": randPrice[Math.floor(Math.random() * 10)],
    //             "genre": genreOptions[Math.floor(Math.random() * 8)],
    //             "bookCount": Math.floor(Math.random() * 100) + 1.
    //             "date": `${Math.floor(Math.random() * 12) + 1},${Math.floor(Math.random() * 31) + 1}, ${Math.floor(Math.random() * 2020) + 2010}`
    //         };

    //     bookList.push(info);
    //     }
    // }
    // Book.insertMany(bookList,function(error, docs){
    //     if(error) return res.json(error);
    //     return res.json("success")
    // })
    // // res.json(bookList)
}

function getABook(req, res) {
    const bookID = req.params.id;
    Book.findById(bookID).then(doc => res.json(doc)).catch(err => res.json(err))
}

