const mongoose = require("mongoose");
const { composeMongoose } = require("graphql-compose-mongoose");

// Define schema
// https://mongoosejs.com/docs/models.html#compiling
const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: String,
});
    
const ContactInfoSchema = mongoose.Schema({
    tel: [String],
    email: [String],
    address: {
        type: AddressSchema,
        required: true,
    },
});

const CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    connectInfo: ContactInfoSchema,
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

// CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity
const CustomerTC = composeMongoose(CustomerModel, customizationOptions);

module.exports = { CustomerTC };