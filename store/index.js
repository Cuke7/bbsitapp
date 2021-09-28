export const state = () => ({
  user: null
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      console.log(authUser);
      state.user = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL
      };
    } else {
      state.user = null;
    }
  }
};
