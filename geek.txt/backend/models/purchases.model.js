const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasesSchema = new Schema({
    BookID: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Books',
    },
    Title: {
            type: String
    },
    CoverURL: {
            type: String
    },
    UserID: { // References to a user.
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required:true
    }
},
    {
        // Create a timestamps for the creation and modification of document.
        timestamps: true,
    }
);

const Purchases = mongoose.model('Purchases', purchasesSchema)
module.exports = Purchases;
