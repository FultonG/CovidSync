const db = require('../db');

const jobCollectionRef = db.collection('jobs');

const user = {
  createPost: async (data) => {
    try {
      await jobCollectionRef.add(data);
      return { status: 200, data: 'Post Created Successfully' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  getAllJobs: async () => {
    try {
      const snapshot = await jobCollectionRef.get();
      const docs = snapshot.docs.map((x) => x.data());
      return { status: 200, data: docs };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
};

module.exports = user;
