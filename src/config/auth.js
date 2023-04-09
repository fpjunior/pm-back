const firebase = require('firebase');
require('firebase/auth');
const firebaseConfig = require('../config/config-firebase');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

auth.signInWithEmailAndPassword('fpsjunior87@gmail.com', '123456')
  .then((userCredential) => {
    // usuário autenticado com sucesso
    const user = userCredential.user;
    console.log(`Usuário autenticado: ${user.email}`);

    const firestore = firebase.firestore();
    firestore.collection('expenses').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch((error) => {
        console.log('Erro ao buscar documentos:', error);
      });
  })
  .catch((error) => {
    // falha na autenticação
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Falha na autenticação: ${errorMessage} (${errorCode})`);
  });


module.exports = {
  auth,
};