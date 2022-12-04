const Product=require('../models/products')

const getAllProductsStatic=async(req,res)=>{
   
    /**
     * ` getAllProductsStatic() = testing route, only manual hard-coded values
     */
    
    /**
     * ! Non-Rigid Searching
     * 
     * > const search='a'
     * > const products=await Product.find({
     * >   name:{$regex:search,$options:'i'}
     * > })
     */
    
    /**
     * ! Sorting
     * > const products=await Product.find({}).sort('price')
     */

    /**
     * ! Selection of fields
     * > const products=await Product.find({}).select('name price')
     */

    /**
     * ! Limiting Data
     * > const products=await Product.find({})
     * >    .sort('name')
     * >    .select('name price')
     * >    .limit(4)
     * >    .skip(2)
     * > 
     */

    const products=await Product.find({price:{$gt:30}})
        .sort('price')
        .select('name price')
     
    res.status(200).json({products, nbHits:products.length})
    //throw new Error('testing async errors...')
}



const getAllProducts=async(req,res)=>{
    //console.log(req.query);
    const {featured,company,name,sort, select, numericFilters}=req.query
    const queryObj={}
    
    if (featured){
        queryObj.featured=featured==='true'?true:false
    }

    if(company){
        queryObj.company=company
    }

    /**
     * ! use regex for non-strict filtering 
     */
    
    if(name){
        queryObj.name={$regex:name,$options:'i'}
    }
    
    /**
     * ! Regex numeric filters
     */
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g; 

        let filters=numericFilters.replace(
            regEx,(match)=>
            `-${operatorMap[match]}-`
            
            /**
             * + added hyphen to later help in splitting the array
             */
        )

        //console.log(filters);

        const options=['price', 'rating']
        filters=filters.split(',').forEach((item)=>{
            const [field,operator,value]=item.split('-')
            if (options.includes(field)){
                queryObj[field]={[operator]:Number(value)}
            }
        })
    }


    console.log(queryObj)

    let result= Product.find(queryObj)
    
    /**
     *  ! Sorting
     */      
      
      if(sort){
        const sortList=sort.split(',').join(' ')
        result=result.sort(sortList)
      }
    
      else{
        result=result.sort('createAt')
      }
      

      /**
       * ! Selection of fields 
       */

      if(select){
        const selectList=select.split(',').join(' ')
        result=result.select(selectList) 
      }

      /**
       * ! Page limits
       */
      
      const page=Number(req.query.page)||1
      const limit=Number(req.query.limit)||10
      const skip=(page-1)*limit


      result=result.skip(skip).limit(limit)
      
      const products=await result
    
    res.status(200).json({products, nbHits:products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}