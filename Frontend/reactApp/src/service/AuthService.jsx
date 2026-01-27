const Save = (user) => {
  sessionStorage.setItem(
    "userCred",
    JSON.stringify({
      id: user.id,
      name: user.username,
      token: user.token,
      type: user.type,
    }),
  );
};

const Get = (user) => sessionStorage.getItem("userCred");

export default {
  Save,
  Get,
};
