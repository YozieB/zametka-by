import { Account, Client, Databases, ID, Query } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://zametka.yozie.ru')
  .setProject('6553a218b0966f5f5f85')
const databases = new Databases(client)
const account = new Account(client)

export const createNote = data => {
  return databases.createDocument(
    '6553c3b28d397388abdc',
    '6558e325c72ed35a0b53',
    ID.unique(),
    data
  )
}

// export const getNotes = () => {
//   return databases.listDocuments('6553c3b28d397388abdc', '6558e325c72ed35a0b53')
// }

export const getNotes = id => {
  return databases.listDocuments(
    '6553c3b28d397388abdc',
    '655b54538172685242fd',
    [Query.equal('$id', id)]
  )
}

export const updateNoteStatus = (note, status) => {
  return databases.updateDocument(
    '6553c3b28d397388abdc',
    '6558e325c72ed35a0b53',
    note.$id,
    { status }
  )
}

export const updateNoteData = (note, data) => {
  return databases.updateDocument(
    '6553c3b28d397388abdc',
    '6558e325c72ed35a0b53',
    note.$id,
    data
  )
}

export const deleteNote = note => {
  return databases.deleteDocument(
    '6553c3b28d397388abdc',
    '6558e325c72ed35a0b53',
    note.$id
  )
}

// export const googleLogin = url => {
//   return account.createOAuth2Session(
//     'google',
//     `http://localhost:5173/${url}`,
//     'http://localhost:5173/error'
//   )
// }

export const googleLogin = url => {
  return account.createOAuth2Session(
    'google',
    'https://zametka.yozie.ru/' + url,
    'https://zametka.yozie.ru/error'
  )
}

export const logout = () => {
  return account.deleteSession('current')
}

export const getUserSession = () => {
  return account.getSession('current')
}

export const getUserData = () => {
  return account.get()
}

export const getBoards = userId => {
  return databases.listDocuments(
    '6553c3b28d397388abdc',
    '655b54538172685242fd',
    [Query.equal('ownedBy', userId)]
  )
}

export const createBoard = data => {
  return databases.createDocument(
    '6553c3b28d397388abdc',
    '655b54538172685242fd',
    ID.unique(),
    data
  )
}

export const deleteBoard = board => {
  return databases.deleteDocument(
    '6553c3b28d397388abdc',
    '655b54538172685242fd',
    board.$id
  )
}
