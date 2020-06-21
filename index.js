const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();
// this app has all the functionality which are needed to run the server



app.set('view engine','ejs'); // we created a property view engine and given its a value
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());  // this is a  middleware
// this is the parser function of express

app.use(express.static('assets'));

//creating my own middlewares
//middleware1
// app.use(function(req,res,next){
//     console.log("this is middleware 1");
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//      console.log('this is middleware2');
//      next();
// });

var contactList = [
    {
        name : "Sagar",
        phone : "9722181457"
    },
    {
        name : "blah blah",
        phone : "1111111111"
    },
    {
        name : "bbrrrr",
        phone : "8888899999"
    }
]



app.get('/',function(req,res){
  //  console.log(__dirname); // directory from which server is starting
   // res.send('here you haha');

   //fetching from database
Contact.find({},function(err,contacts){
    if(err){
        console.log('Error in fetching contacts from db');
        return;
    }
    return res.render('home', {
        title : 'Contact List',
        contact_list : contacts
    });
})

//    return res.render('home', {
//        title : 'Contact List',
//        contact_list : contactList
//    });
});

app.post('/create-contact',function(req,res){
   
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });

  //  contactList.push(req.body);
  // now i don't need contactlist i will put this data in database 

  Contact.create({
      name : req.body.name,
      phone : req.body.phone
  },function(err,newContact){
      if(err){
          console.log('error in creating a contact');
          return;
      }
      console.log('*******',newContact);
      res.redirect('back');
  })

   // return res.redirect('/');
 //return res.redirect('back');
});




app.listen(port, function(err){

    if(err){ console.log('Error in running the server',err);}

    console.log('yup! my express server is running on the port : ',port);


});

//delete data from database
app.get('/delete-contact/',function(req,res){
    //get id from query in the database
    let id = req.query.id;

    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error while deleting the contact from database');
            return;
        }
        return res.redirect('back');
    })
});



// app.get('/delete-contact/',function(req,res){

//     // console.log(req.params);
//     // let phone = req.params.phone;

//     let phone = req.query.phone;

//     let contcatIndex = contactList.findIndex(contact => contact.phone == phone);

//     if(contcatIndex != -1){
//         contactList.splice(contcatIndex, 1);
//         console.log('yeah i reached here')
//     }

//     return res.redirect('back');
// });
