export const host = process.env.REACT_APP_API_URL;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMsgRoute = `${host}/api/messages/addMsg`;
export const recieveMsgRoute = `${host}/api/messages/getMsg`;
