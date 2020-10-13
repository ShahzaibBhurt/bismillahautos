var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbconfig = require('./database');
const fileUpload = require('../public/lib/index');
module.exports = function (app, passport) {
    var connection;
    function handleDisconnect() {
      connection = mysql.createConnection(dbconfig.connection);
      connection.connect(function(err) {              
        if(err) {                                     
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); 
        }                                     
      });                                     
      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
          handleDisconnect();                         
        } else {                                      
          throw err;                                  
        }
      });
    }
    handleDisconnect();
    app.use(fileUpload());
    app.post('/save_product', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        date = year+"-"+month+"-"+day;
        var brand = req.body.brand;
        var model = req.body.model;
        var motor_type = req.body.motor_type;
        var color = req.body.color;
        var cc = req.body.cc;
        var engin_number = req.body.engine_number;
        var chasis_number = req.body.chasis_number;
        var total_price = req.body.total;
        var checkAvailiblity = "SELECT engin_number FROM products WHERE engin_number=?"
        var insert_pro = "INSERT INTO products(e_date, brand, model, motor_type, color, cc, engin_number, chasis_number, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var insert_purchase = "INSERT INTO purchase_history(e_date, brand, model, motor_type, color, cc, engin_number, chasis_number, total_price, balance) VALUES (?,?,?,?,?,?,?,?,?,?+?)";
        var update_credit = "UPDATE companies SET credit=credit+? WHERE brand_name=?"
        var selectOldBalance = "SELECT balance FROM purchase_history WHERE brand=? order by id DESC LIMIT 1"
        connection.query(checkAvailiblity, [engin_number], (error, results, fields)=>{
            if(results.length > 0){
                req.flash('dangermsg',"Product is already available");
                res.redirect('/product_entry');
            }else{
                connection.query(selectOldBalance, [brand], function(error, results, fields){
                    if(!error){
                        var oldBalance = 0
                        if(results.length > 0){
                            oldBalance = results[0].balance
                        }
                        connection.query(insert_pro, [date, brand, model, motor_type, color, cc, engin_number, chasis_number, total_price],
                            function(error, results, fields) {
                                if(!error){
                                    connection.query(insert_purchase, [date, brand, model, motor_type, color, cc, engin_number, chasis_number, total_price, total_price, oldBalance])
                                    connection.query(update_credit, [total_price, brand])
                                    var array = [model, motor_type, color, cc, total_price];
                                    req.flash('msg', 'Product Saved')
                                    req.flash('productInfo', array)
                                    res.redirect('/product_entry')
                                }else{
                                    req.flash('dangermsg',"Product Not Save")
                                    res.redirect('/product_entry');
                                }
                            });
                    }
                })
            }
        })
      });
      app.post('/save_profile', function(req, res){
        var id = req.body.id;
        var username = req.body.username;
        var old_pass = req.body.old_pass;
        var pass = req.body.new_pass;
        var selectQuery = "select * from users where id=?";
        var updateQuery = "UPDATE users SET username=?, password=? WHERE id=?";
        connection.query(selectQuery, [id],
            function(error, results, fields) {
                if(results.length > 0){
                    if (bcrypt.compareSync(old_pass, results[0].password)) {
                        (pass != "")?pass = bcrypt.hashSync(pass, 10):pass = bcrypt.hashSync(old_pass, 10);
                    connection.query(updateQuery, [username, pass, id],
                        function(err, result, field) {
                            if(!err){
                                req.flash('msg', 'Your Profile details are updated')
                                res.redirect('/edit_profile');
                            }else{
                                req.flash('dangermsg', 'Your Profile delails are not updated')
                                res.redirect('/edit_profile');
                            }
                        });
                    }else{
                        req.flash('dangermsg', 'Incorrect Password')
                        res.redirect('/edit_profile');
                    }
                }
            });
      });
      app.get('/productList', function(req, res){
          var select = "select * from products ORDER by id desc";
          connection.query(select, (error, results, fields)=>{
            if(results.length > 0){
                res.send(results);
            }else{
                console.log("no data")
                res.send("");
            }
          })
      })
      app.get('/CompanyList', function(req, res){
        var select = "SELECT brand_name FROM companies";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send("");
          }
        })
    })
    app.get('/getLeterDetails', function(req, res){
        var select = "SELECT * FROM sales_history where engine_number like ?";
        connection.query(select, ["%"+req.query.engine_number+"%"], (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send("");
          }
        })
    })
    app.post('/uploadFiles', function(req, res){
        var fileName = req.body.engine_number;
        let file;
        let uploadPath;
        var updateQuery = "UPDATE sales_history SET letter_status=? WHERE engine_number=?"

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
        file = req.files.files;
        for(let i = 0 ; i < file.length; i++){
            let extArray = file[i].mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            uploadPath = __dirname+'/uploads/' + fileName+'('+(parseInt(i)+1)+').'+extension;
            
           file[i].mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        connection.query(updateQuery, ['Picked', fileName], (error, results, fields)=>{
            if(!error){
                req.flash('msg', 'Files Uploaded')
                res.redirect('/letter_picking');
            }else{
                req.flash('dangermsg', 'Status Not Changed')
                res.redirect('/letter_picking');
            }
        })
    })
    app.get('/getCompanyDetails', function(req, res){
        var select = "SELECT number, address, credit FROM companies where brand_name=?";
        connection.query(select, [req.query.company_name],(error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send("");
          }
        })
    })
      app.get('/customersList', function(req, res){
        var select = "select * from customers ORDER by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send("");
          }
        })
    })
    app.get('/supplierList', function(req, res){
        var select = "select * from companies ORDER by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send("");
          }
        })
    })
    app.get('/getSerial', function(req, res){
        var select = "select id from sales_history ORDER by id desc limit 1";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(''+(results[0].id+1)+'');
          }else{
              console.log("no data")
              res.send('1');
          }
        })
    })
    app.get('/getSalesHistory', function(req, res){
        var select = "select * from sales_history where brand not in('') ORDER by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/getPurchaseHistory', function(req, res){
        var select = "select * from purchase_history where engin_number not in('') ORDER by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/getBikeBrand', function(req, res){
        var select = "SELECT brand_name FROM companies";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              res.send('');
          }
        })
    })
    app.get('/getBikeModel', function(req, res){
        var select = "SELECT model FROM products GROUP by model";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              res.send('');
          }
        })
    })
    app.get('/getBikeMotorType', function(req, res){
        var select = "SELECT motor_type FROM products GROUP by motor_type";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              res.send('');
          }
        })
    })
    app.get('/getBikeColor', function(req, res){
        var select = "SELECT color FROM products GROUP by color";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              res.send('');
          }
        })
    })
    app.get('/getBikeCC', function(req, res){
        var select = "SELECT CC FROM products GROUP by CC";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              res.send('');
          }
        })
    })
    app.get('/getEngineNums', function(req, res){
        var select = "SELECT engin_number FROM products where engin_number like ?";
        var regex = new RegExp(req.query['term']);
        var str = regex.source;
        str = '%'+str+'%';
        connection.query(select, [str], (error, results, fields)=>{
            var result=[];
          if(!error){
              results.forEach(element => {
                let obj={
                    label: element.engin_number
                }
                result.push(obj)                 
              });
              res.jsonp(result);
          }else{
              console.log("no data "+error)
          }
        })
    })
    app.get('/getDetails', function(req, res){
        var select = "select * from products where engin_number = ?";
        connection.query(select, [req.query.engine_number], (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/getCustDetails', function(req, res){
        var select = "select * from customers where serial_number = ?";
        connection.query(select, [req.query.c_id], (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/CusPayList', function(req, res){
        var select = "SELECT * FROM payment_history order by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/SupPayList', function(req, res){
        var select = "SELECT * FROM companies_pay_history order by id desc";
        connection.query(select, (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/getCusPayments', function(req, res){
        var select = "SELECT name, cast, number, cnic, address, debit FROM customers WHERE serial_number=?";
        connection.query(select, [req.query.customer_id], (error, results, fields)=>{
          if(results.length > 0){
              res.send(results);
          }else{
              console.log("no data")
              res.send('');
          }
        })
    })
    app.get('/customersLedger', (req, res)=>{
        var c_id = req.query.user_id
        var selectQuery = "SELECT * FROM sales_history where serial_number=? "
        connection.query(selectQuery, [c_id], (error, results, fields)=>{
            if(results.length > 0){
                res.send(results)
            }else{
                res.send('')
            }
        })
    })
    app.get('/SuppliersLedger', (req, res)=>{
        var company_name = req.query.company_name
        var selectQuery = "SELECT * FROM purchase_history WHERE brand=?"
        connection.query(selectQuery, [company_name], (error, results, fields)=>{
            if(results.length > 0){
                res.send(results)
            }else{
                res.send('')
            }
        })
    })
    app.get('/images', function(req, res){
        const fs = require('fs')
        const dir = __dirname+'/uploads/'
        var en = req.query.en 
        var i=1, limit=10, imgs = [], extension = ['jpg', 'jpeg', 'png']
        increament(i, 0, 1)
        function increament(i, ex, attemp){
            fs.readFile(dir+en+'('+i+').'+extension[ex], (err, data)=>{
                if(err){
                    if(ex == 2){
                        if(attemp == 4){
                            processFile(imgs)
                        }else{
                            ex = 0
                            attemp = attemp+1
                            increament(i, ex, attemp)
                        }
                    }else{
                        ex = ex+1
                        increament(i, ex, attemp)
                    }
                }else{
                    imgs[i-1] = Buffer.from(data).toString('base64')
                    i=i+1
                    increament(i, ex, attemp)
                }
            })
        }
       function processFile(imgs){
        res.send(imgs)
       }
    })
    app.get('/saveRegOrder', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var tbl_data = req.query.tbl_data;
        var cash = req.query.cash;
        var credit = req.query.allTotal;
        var name = req.query.name;
        var number = req.query.number;
        var cnic = req.query.cnic;
        var address = req.query.address;

        var deleteQuery = "DELETE FROM products WHERE engin_number=? AND chasis_number=?";
        var insert = "INSERT INTO sales_history(serial_number, order_dateTime, name, cnic, number, address, brand, model, motor_type, cc, color, engine_number, chasis_number, total_price, balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?+?)";
        var updateAccount = "UPDATE customers SET debit=debit+? WHERE serial_number=?";
        var selectOldBalance = "SELECT balance FROM sales_history where serial_number=? order by id DESC LIMIT 1"
        var insertPayment = "INSERT INTO sales_history(serial_number, date, balance, cash) VALUES (UPPER(?),?,?+?,?)";
        var length = tbl_data.length-1;
        connection.query(selectOldBalance, [tbl_data[0].customer_id], function(error, results, fields){
            if(!error){
                var oldBalance = 0
                var CountPayments = 0
                if(results.length > 0){
                    oldBalance = results[0].balance
                }
                for(var i=0; i<length;i++){
                    CountPayments = (parseInt(CountPayments)+parseInt(tbl_data[i].prize))
                    connection.query(insert, [
                        tbl_data[i].customer_id, dateTime, name, cnic, number, address,
                        tbl_data[i].brand, tbl_data[i].model, tbl_data[i].motor_type, tbl_data[i].cc,
                        tbl_data[i].color, tbl_data[i].engine_number, tbl_data[i].chasis_number, tbl_data[i].prize, CountPayments, oldBalance])
                        connection.query(deleteQuery, [tbl_data[i].engine_number, tbl_data[i].chasis_number]);
                }
                if(cash){
                    connection.query(insertPayment, [tbl_data[0].customer_id, dateTime, credit, oldBalance, cash])
                }  
                connection.query(updateAccount, [credit, tbl_data[0].customer_id])
                console.log("data Saved")
                res.status(200).send('Order Saved');
            }
        })
    })
      app.post('/createCustomerAccount', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        date = year+"-"+month+"-"+day;
        var name = req.body.name;
        var cast = req.body.cast;
        var number = req.body.number;
        var cnic = req.body.cnic;
        var address = req.body.address;
        var insertQuery = "INSERT INTO customers(name, cast, number, cnic, address, account_creation_date, debit) VALUES (?, ?, ?, ?, ?, ?, ?)";
        var UpdateAccount = "UPDATE customers SET serial_number= (SELECT CONCAT('C-', id) FROM customers WHERE name=? AND cnic=? AND cast=? order by id desc limit 1) WHERE name=? AND cnic=? AND cast=? order by id desc limit 1"
        connection.query(insertQuery, [name, cast, number, cnic, address, date, 0],
            function(error, results, fields) {
                if(!error){
                    connection.query(UpdateAccount, [name, cnic, cast, name, cnic, cast],
                        function(err, resu, fields) {
                            if(!err){
                                req.flash('msg', 'Account Created')
                                res.redirect('/create_customer_account')
                            }else{
                                req.flash('dangermsg', 'Account Not update with serial number')
                                res.redirect('/create_customer_account')
                            }
                        });
                }else{
                    req.flash('dangermsg', 'Account not created please try again')
                    res.redirect('/create_customer_account')
                }
            });
      });
      app.post('/createCompanyAccount', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        date = year+"-"+month+"-"+day;
        var name = req.body.name;
        var number = req.body.number;
        var address = req.body.address;
        var insertQuery = "INSERT INTO companies(brand_name, number, address, creation_date, credit) VALUES (?,?,?,?,?)";
        connection.query(insertQuery, [name, number, address, date, 0],
            function(error, results, fields) {
                if(!error){
                    req.flash('msg',"Account Created")
                    res.redirect('/create_supplier_account');
                }else{
                    req.flash('dangermsg',"Account not created please try again")
                    res.redirect('/create_supplier_account');
                }
            });
      });
      app.post('/saveNewCustomerOrder', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        var date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var onlyDate = day+'/'+month+'/'+year
        var s_number = req.body.s_number
        var name = req.body.n_name;
        var cnic = req.body.n_cnic;
        var number = req.body.n_number;
        var address = req.body.n_address;
        var engine_number = req.body.n_engine_number;
        var chasis_number = req.body.n_chasis_number;
        var brand = req.body.n_brand;
        var model = req.body.n_model;
        var motor_type = req.body.n_motor_type;
        var cc = req.body.n_cc;
        var color = req.body.n_color;
        var prize = req.body.n_total_prize;
        var insertQuery = "INSERT INTO sales_history(serial_number, order_dateTime, name, cnic, number, address, brand, model, motor_type, cc, color, engine_number, chasis_number, total_price, balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var deleteQuery = "DELETE FROM products WHERE engin_number=? AND chasis_number=?";
        connection.query(insertQuery, [s_number, date, name, cnic, number, address, brand, model, motor_type, cc, color, engine_number, chasis_number, prize, prize],
            function(error, results, fields) {
                if(!error){
                    connection.query(deleteQuery, [engine_number, chasis_number]);
                    var invoiceInfo = [s_number, onlyDate, name, cnic, number, address, brand, model, motor_type, cc, color, engine_number, chasis_number, prize]
                    req.flash('invoiceInfo', invoiceInfo)
                    req.flash('msg', 'Order saved')
                    res.redirect('/order');
                }else{
                    req.flash('dangermsg', 'Order not saved please try again')
                    res.redirect('/order');
                }
            });
      });
      app.post('/saveCredit', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        var date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var c_id = req.body.c_account_id
        var description = req.body.c_description
        var payment_type = req.body.c_payment_type
        var cash = req.body.c_cash;
        var remaining_balance = req.body.c_remaining_balance
        var insertPayment = "INSERT INTO sales_history(serial_number, order_dateTime, payment_type, description, total_price, balance) VALUES (?,?,?,?,?,?)";
        var updateCredit = "UPDATE customers SET debit=? WHERE serial_number=?"
        connection.query(insertPayment, [c_id, date, payment_type, description, cash, remaining_balance],
            function(error, results, fields) {
                if(!error){
                    connection.query(updateCredit, [remaining_balance, c_id])
                    req.flash('msg', 'Payment saved')
                    res.redirect('/customer_payments');
                }else{
                    req.flash('dangermsg', 'Payment not saved please try again')
                    res.redirect('/customer_payments');
                }
            });
      });
      app.post('/saveRemeningPayments', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var s_number = req.body.account_id
        var description = req.body.description;
        var payment_type = req.body.payment_type
        var cash = req.body.cash
        var remaining_balance = req.body.remaining_balance
        var insertPayment = "INSERT INTO sales_history(serial_number, order_dateTime, payment_type, description, cash, balance) VALUES (?,?,?,?,?,?)";
        var updateDebit = "UPDATE customers SET debit=? WHERE serial_number=?"
        connection.query(insertPayment, [s_number, date, payment_type, description, cash, remaining_balance],
            function(error, results, fields) {
                if(!error){
                    connection.query(updateDebit, [remaining_balance, s_number])
                    req.flash('msg', 'Payment saved')
                    res.redirect('/customer_payments');
                }else{
                    req.flash('dangermsg', 'Payment not saved please try again')
                    res.redirect('/customer_payments');
                }
            });
      });
      app.post('/saveSupplierPayments', function(req, res){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var company_name = req.body.company_name
        var description = req.body.description;
        var cash = req.body.cash
        var credit = req.body.remaining_balance
        var insertPayment = "INSERT INTO purchase_history(e_date, brand, description, cash, balance) VALUES (?,?,?,?,?)";
        var updateCredit = "UPDATE companies SET credit=? WHERE brand_name=?"
        connection.query(insertPayment, [date, company_name, description, cash, credit],
            function(error, results, fields) {
                if(!error){
                    connection.query(updateCredit, [credit, company_name])
                    req.flash('msg', 'Payment saved')
                    res.redirect('/supplier_payments');
                }else{
                    req.flash("dangermsg", "Payment not saved please try again")
                    res.redirect('/supplier_payments');
                }
            });
      });
    passport.serializeUser(function (user, done) {
        if(user.id == undefined)
            done (null, user);
        else
            done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        if(isNaN(id))
            done(null, id)
        else
        connection.query("SELECT * FROM users where id=?", [id],
            function (err, rows) {
                done(err, rows[0]);
            });
    });
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ? ", [username],
                    function (err, rows) {
                        if (err)
                            return done(err);
                        if(rows.length > 0){
                            if (bcrypt.compareSync(password, rows[0].password)) {
                                //if(password == rows[0].password){
                               return done(null, rows[0]); 
                            }else{
                               return done(null, false, req.flash('loginMessage', 'Incorrect Password')); 
                            }                            
                        }else{
                            return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
                        }
                    });
            })
    );
};