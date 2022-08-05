const faker = require("faker");
const mongoose = require("mongoose");
const { CustomerModel } = require("./customer");
const connectDB = require("./db");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Connection URL
const uri = "mongodb://localhost:27017/test";

connectDB();

CustomerModel.collection.drop()
    .then(() => {
        console.log("Collection dropped!");
    })
    .catch((err) => {
        console.log("Collection not dropped!");
    }); 

console.log("Seeding DB...");
seedDB(generateCustomers(5000))
    .then(() => {
        console.log("Database seeded!");
        mongoose.connection.close();
    }
);

// mongoose.connection.close();

function generateCustomers(nQty) {
    // generate 5000 customers
    const customers = [];
    for (let i = 0; i < nQty; i++) {
        const customer = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.companyName(),
            connectInfo: {
                tel: [
                    faker.phone.phoneNumber(),
                    faker.phone.phoneNumber(),
                    faker.phone.phoneNumber(),
                ],
                email: [
                    faker.internet.email(),
                    faker.internet.email(),
                    faker.internet.email(),
                ],
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName(),
                    houseNumber: randomIntFromInterval(1, 200),
                },
            },
        };
        customers.push(customer);
    }
    return customers;
}



/*
function generateCustomers() {
    let customers = [];
    for (let i = 0; i < 5000; i++) {
        const customer = new CustomerModel({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.companyName(),
            connectInfo: {
                tel: [randomIntFromInterval(100000000, 999999999), randomIntFromInterval(100000000, 999999999)],
                email: [faker.internet.email(), faker.internet.email()],
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName(),
                    houseNumber: faker.address.streetAddress(),
                }
            }
        });
        customers.push(customer);
    }
    return customers;
}
*/



    /*

try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("grap").collection("kitty-litter-time-series");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];

    for (let i = 0; i < 5000; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        let newDay = {
            timestamp_day: faker.date.past(),
            cat: faker.random.word(),
            owner: {
                email: faker.internet.email(firstName, lastName),
                firstName,
                lastName,
            },
            events: [],
        };

        for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
            let newEvent = {
                timestamp_event: faker.date.past(),
                weight: randomIntFromInterval(14,16),
            }
            newDay.events.push(newEvent);
        }
        timeSeriesData.push(newDay);
    }
    collection.insertMany(timeSeriesData);

    console.log("Database seeded! :)");
    client.close();
} catch (err) {
    console.log(err.stack);
}
*/

async function seedDB(customers)  {
    return CustomerModel.insertMany(customers);
}
