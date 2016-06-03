const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

const authCheck = jwt({
  secret: new Buffer('try2TSrs5Tbg0BZIQUUMx6XBM-BkdTYl9VsbvfmeWhPKz-FFcXZZAAPQKi4L-vPyT', 'base64'),
  audience: 'hXryApiXOTYlnwPHJDlEgBoFTB8B7WzQ'
});

var contacts = [
  {
    id: 1,
    name: 'Joe Dirt',
    email: 'joe@dirt.com',
    image: 'http://i.dailymail.co.uk/i/pix/2014/11/20/1416470749671_Image_galleryImage_joe_dirt_jpg.JPG'
  },
  {
    id: 2,
    name: 'Jane Dump',
    email: 'jane@dump.com',
    image: 'http://untangling-knots.com/shop/wp-content/uploads/2014/09/plain_jane_front_01_wide_cropped.jpg'
  }
];
app.use(cors());

app.get('/api/contacts', (req, res) => {
  const allContacts = contacts.map(contact => {
    return { id: contact.id, name: contact.name }
  });
  res.json(allContacts);
});

app.get('/api/contacts/:id', authCheck, (req, res) => {
  res.json(contacts.filter(contact => contact.id === parseInt(req.params.id)));
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
