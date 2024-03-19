const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const userGoogle = require ('../models/user.modelGoogle');

passport.serializeUser((user,done) => {
 done(null,user.id);
});

passport.deserializeUser((id,done) => {
    userGoogle.findById(id).then((user)=>{
        done(null,user);

    })
   });

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/api/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
//check if user already exists in our db 
userGoogle.findOne({googleId: profile.id}).then((currentUser)=>{
if(currentUser){
    //already have the user
  console.log('user is', currentUser);
  done(null,currentUser)
}else{
    //if not, create user in our db
    new User({
        username: profile.displayName,
        googleId:profile.id,
        thumbnail:profile._json.image.url

    }).save().then((newUser)=>{
        console.log('new user created'+ newUser);
        done(null,newUser);


    })
}
})
      
    })
);
