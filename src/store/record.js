import firebase from "firebase/app";

export default {
  actions: {
    async createRecord(
      { commit, dispatch },
      { description, amount, categoryId, date, type }
    ) {
      try {
        const uid = await dispatch("getUid");
        const record = await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push({ description, amount, categoryId, date, type });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (await firebase
            .database()
            .ref(`/users/${uid}/records`)
            .once("value")).val() || {};
        return Object.keys(records).map(key => ({
          ...records[key],
          recId: key
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ commit, dispatch }, recId) {
      try {
        const uid = await dispatch("getUid");
        const record = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .child(recId)
          .once("value")).val();
        return record;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
