import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500 // if it's not, is from Google
        
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        } else{
            decodedData = jwt.decode(token) // from Google
            req.userId = decodedData?.sub // sub: Google's name for specific id for every user
        }
        next()

    } catch (error) {
        console.log({ error })
    }
}

export default auth