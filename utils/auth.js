const withAuth = (req, res, next) => {
    // Do stuff
    if (!req.session.logged_in) {
        res.redirect('/login')
    } else {
        next();
    }
};

module.exports = { withAuth}