require('dotenv').config()

const connectDB=require('./db/connect')
const Product=require('./models/products')

const jsonProducts=require('./products.json')

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('successfully connected db...');        
    } catch (error) {
        console.log(error);
    }
}

start()
