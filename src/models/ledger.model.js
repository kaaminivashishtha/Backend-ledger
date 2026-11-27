const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'account',
        required: [true, "Ledger must be associated with an account"],
        index: true ,
        immutable: true

    },   
    amount:{
        type: Number,
        required: [true, "Ledger must have an amount"],
        immutable: true
    } ,
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction',
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type:{  
        type: String,
        enum: ['CREDIT', 'DEBIT'],
        message: 'Ledger type is either: credit, debit', 
        required: [true, "Ledger must have a type"],   
        immutable: true   
    } 

    
})
function preventledgermodification() {
    throw new Error("Ledger entries cannot be modified or deleted");
}

ledgerSchema.pre('updateOne', preventledgermodification);
ledgerSchema.pre('deleteOne', preventledgermodification);
ledgerSchema.pre('findOneAndUpdate', preventledgermodification);
ledgerSchema.pre('findOneAndDelete', preventledgermodification); 
ledgerSchema.pre('remove', preventledgermodification);  
ledgerSchema.pre('deleteMany', preventledgermodification);
ledgerSchema.pre('updateMany', preventledgermodification);
ledgerSchema.pre('findOneAndReplace', preventledgermodification);

const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel;
