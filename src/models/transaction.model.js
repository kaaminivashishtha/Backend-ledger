const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, "Transaction must be associated with from  account"]  ,
        index: true
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, "Transaction must be associated with to account"]  ,
        index: true
    },

    status:{
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'REVERSED'],
        message: 'Status is either: pending, completed, failed',
        default: 'PENDING'
    },
    amount:{
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Transaction amount must be greater than 0"]
    },
    idempotencyKey:{
        type: String,
        required: [true, "Transaction must have an idempotency key"],
        index: true,
        unique: true
    }
},{
    timestamps: true
})

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;