let PORT = process.env.PORT;

const baseURL = `http://localhost:${PORT}`

const note = '/notes'
const auth = '/auth'

export const POST_ADD_NOTE = baseURL + note + `/AddNote`;
export const PUT_EDIT_NOTE = baseURL + note + `/UpdateNote`;
export const DELETE_REMOVE_NOTE = baseURL + note + `/deleteNote`;
export const GET_ALL_NOTE = baseURL + note + `/fetchAll`;

export const POST_SIGNUP_USER = baseURL + auth + `/signup`;
export const POST_SIGNIN_USER = baseURL + auth + `/signin`;
