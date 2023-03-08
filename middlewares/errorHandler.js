

const errorHandler = (req,res,next,err) => {
    res.send(err.message)
}


module.exports = errorHandler