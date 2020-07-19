const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const userCollectionRef = db.collection('users');

const user = {
  createUser: async (data) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const doc = await userCollectionRef.doc(data.username).get();
      if (!doc.exists) {
        await userCollectionRef.doc(data.username).set({ ...data, password: hash });
        return { status: 200, data: 'Account Created Successfully' };
      }
      return { status: 409, data: 'Email already in use' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  authenticateUser: async (data) => {
    try {
      const doc = await userCollectionRef.doc(data.username).get();
      if (doc.exists) {
        const success = await bcrypt.compare(data.password, doc.data().password);
        if (success) {
          const token = jwt.sign({ username: data.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
          return { status: 200, data: { username: data.username, token } };
        }
        return { status: 401, data: 'Invalid Credentials' };
      }
      return { status: 404, data: 'Account not found' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
};

module.exports = user;
