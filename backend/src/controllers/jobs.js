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
      const docs = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
      return { status: 200, data: docs };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  getJobById: async (id) => {
    try {
      const doc = await jobCollectionRef.doc(id).get();
      if (doc.exists) {
        return { status: 200, data: doc.data() };
      }
      return { status: 404, data: 'Not Found' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  addApplicant: async (body) => {
    try {
      const doc = await jobCollectionRef.doc(body.id).collection('applicants').doc(body.user.username).get();
      if (doc.exists) {
        return { status: 409, data: 'Already Applied' };
      }
      await jobCollectionRef.doc(body.id).collection('applicants').doc(body.user.username).set({ ...body.user });
      return { status: 200, data: 'Application Submitted Successfully' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
};

module.exports = user;
