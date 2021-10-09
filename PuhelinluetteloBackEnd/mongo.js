const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
const password = process.argv[2]

const url =`mongodb+srv://jhalah:${password}@cluster0.z1fly.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Number = mongoose.model("Person", personSchema);

if (process.argv.length>3){
       
    const newNumber = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })

    newNumber.save().then(res => {
        console.log(newNumber + "saved")
        mongoose.connection.close()
    })
}
else {
    Number.find({}).then(res => {
        res.forEach(a => {
            console.log(a)
        })
        mongoose.connection.close()
    })
}