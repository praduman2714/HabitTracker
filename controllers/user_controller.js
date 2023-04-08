const User = require('../model/user');

// This function is used to redirect the user into the signUp page.
module.exports.signUp = function(req, res){
    //console.log(req.params);
    return res.render('sign_up', {
        title : 'Sign-up'
    })
}
// This fucntion is used to redirect the user to the signIn page.
module.exports.signIn = function(req, res){
    return res.render('sign_In' , {
        title : "Sign-In"
    })
}
// for creating the user , this fucntion is made
module.exports.create = async function(req, res){
    // console.log("User created fucntion loaded");
    //console.log(req.body);
    
    if(req.body.password != req.body.confirmPassword){
        return res.redirect("back");
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create(req.body);
        return res.redirect('/users/sign-in');
    }
     return res.redirect("back");
}
// User for logging into the id
module.exports.createSession = async function(req, res){
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

// Used for logout 
module.exports.destroySession = function(req, res, done){
    req.flash('success' , 'Logged Out');
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    })
    return res.redirect('/users/sign-in');
    
    
}

// forrget password page

module.exports.forgetPasswordPage = function(req, res){
    return res.render('forget_password',{
        title : 'Forget Password'
    });
}

module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    //console.log(user);
    //console.log(req.body);
    if(!user){
        return res.redirect('/users/sign-up');
    }
    if(req.body.password == req.body.confirmPassword){
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');

}