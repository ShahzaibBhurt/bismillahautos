module.exports = function(app, passport) {
 app.get('/', isLoggedIn, function(req, res){
  res.render('order.ejs');
 });

 app.get('/login', isLogin, function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });
    
app.get('/letter_picking', isLoggedIn, function(req, res){
  res.render('letter_picking.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg:req.flash('dangermsg')
  });
 });

app.get('/accounts_list', isLoggedIn, function(req, res){
  res.render('accounts_list.ejs', {
      user:req.user
  });
 });
app.get('/create_supplier_account', isLoggedIn, function(req, res){
  res.render('create_supplier_account.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg:req.flash('dangermsg')
  });
 });
app.get('/create_customer_account', isLoggedIn, function(req, res){
  res.render('create_customer_account.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg:req.flash('dangermsg')
  });
 });
app.get('/create_investor_account', isLoggedIn, function(req, res){
  res.render('create_investor_account.ejs', {
      user:req.user
  });
 });
    
app.get('/customer_payments', isLoggedIn, function(req, res){
  res.render('customer_payments.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg:req.flash('dangermsg')
  });
 });
app.get('/edit_profile', isLoggedIn, function(req, res){
  res.render('edit_profile.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg: req.flash('dangermsg')
  });
 });
app.get('/payment_history', isLoggedIn, function(req, res){
  res.render('payment_history.ejs', {
      user:req.user
  });
 });
app.get('/product_entry', isLoggedIn, function(req, res){
  res.render('product_entry.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg:req.flash('dangermsg'),
      productInfo:req.flash('productInfo')
  });
 });
    
app.get('/product_list', isLoggedIn, function(req, res){
  res.render('product_list.ejs', {
      user:req.user
  });
 });
app.get('/purchase_history', isLoggedIn, function(req, res){
  res.render('purchase_history.ejs', {
      user:req.user
  });
 });
app.get('/sales_history', isLoggedIn, function(req, res){
  res.render('sales_history.ejs', {
      user:req.user
  });
 });
app.get('/supplier_payments', isLoggedIn, function(req, res){
  res.render('supplier_payments.ejs', {
      user:req.user,
      msg:req.flash('msg'),
      dangermsg: req.flash('dangermsg')
  });
 }); 
 app.post('/login_form', passport.authenticate('local-login', {
  successRedirect: '/order',
  failureRedirect: '/login',
  failureFlash: true
 }));
 app.get('/order', isLoggedIn, function(req, res){
  res.render('order.ejs', {
   user:req.user,
   invoiceInfo:req.flash('invoiceInfo'),
   msg:req.flash('msg'),
   dangermsg:req.flash('dangermsg')
  });
 });
 
 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login');
 })
 
function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/login');
}
function isLogin(req, res, next){
 if(req.isAuthenticated()){
     res.redirect('/order');
 }else{
     return next();
 }
}
}