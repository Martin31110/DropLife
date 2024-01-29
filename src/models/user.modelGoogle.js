const userSchemaGoogle = new Schema({
    username: String,
    googleId: String,
    thumnail: String
    })
    
const userGoogle = mongoose.model('user',userSchemaGoogle);
    
moduele.exports = userGoogle;