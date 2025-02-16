const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = () => {
    try{
        cloudinary.config({
            cloud_name: 'ddbyrjhk4',
            api_key: '531552567195233',
            api_secret: 'JJbBby3mBI_BXjUUqJWUEr49DFQ'
        })
    }
    catch(error){
        console.log(error);
        console.log('Cloudinary connection failed');
    } 
}

module.exports = cloudinaryConfig;