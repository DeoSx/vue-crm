import firebase from "firebase/app";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, type }) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, type });
        return { title, type, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .once("value")).val() || {};
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      const uid = await dispatch("getUid");
      const category =
        (await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .once("value")).val() || {};
      return category;
    },
    async updateCategory({ commit, dispatch }, { title, type, id }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, type });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
