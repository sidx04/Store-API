const getAllProductsStatic=async(req,res)=>{
    res.status(200).json({msg:'products testing route'})
    //throw new Error('testing async errors...')
}

const getAllProducts=async(req,res)=>{
    res.status(200).json({msg:'products route'})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}