

module.exports.signUp = function(req, res){
    
    return res.render('sign_up', {
        title : 'Sign-up'
    })
}

module.exports.signIn = function(req, res){
    return res.render('sign_In' , {
        title : "Sign-In"
    })
}