const { pick } = require('lodash');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { me } = req.user; //idul userului adminului care face requestul, liniile 4,5,6,7 raman daca e ruta de admin
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const { name, price, year } = req.body; //destructurare
  const db = initializeFirestore();
  const articlesRef = db.collection('articles'); //colectiile din firestore sunt mereu la plural -> conventie
  const snapshot = await articlesRef //verificam daca in colectia noastra mai exista ceva cu aceleasi valori
    .where('name', '==', name)
    .where('price','==',parseFloat(price)) 
    .where('year','==',Number(year)) //constructor de Int
    .where('identity.id', '==', me)
    .where('available','==',true)
    .get();
  if (snapshot.size) {
    throw error(409, 'An identical article already exists');
  }

  const identitiesRef = db.collection('identities');
  const doc = await identitiesRef.doc(me).get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

  const payload = {
    identity: {
      ...pick(doc.data(), ['email', 'name']), //spread operator
      id: doc.id,
      //aici am stocat despre cine are dreptul sa creeze
    },
    name: name.trim(),
    price: parseFloat(price.trim()),
    year: Number(year.trim())
  };

  const response = await articlesRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create article');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Article created' });
};