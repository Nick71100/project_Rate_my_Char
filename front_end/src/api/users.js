export const deleteUser = async (userId) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res;
};

export const updateEmail = async (userId, email) => {
  /* ... */
};
export const updatePseudo = async (userId, pseudo) => {
  /* ... */
};
