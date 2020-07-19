const Firestore = require('@google-cloud/firestore');
const { private_key, client_email, project_id } = require('../../PantherHacks-a147fd3832c0.json');

const db = new Firestore({
  projectId: 'pantherhacks',
  credentials: {
    private_key,
    client_email,
  },
  project_id,
});

module.exports = db;
