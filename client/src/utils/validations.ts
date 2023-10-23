export const AS_REQUIRED = { required: "Required" };
export const AS_EMAIL = {
  ...AS_REQUIRED,
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: "Wrong Email Format",
  },
};

export const AS_PASSWORD = {
  ...AS_REQUIRED,
};
