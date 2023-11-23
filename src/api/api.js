import { Account, Client, Databases, ID, Query } from 'appwrite'

const endpoint = import.meta.env.VITE_ENDPOINT
const project = import.meta.env.VITE_PROJECT
const database = import.meta.env.VITE_DB

const client = new Client()
client
  .setEndpoint(endpoint)
  .setProject(project)
const databases = new Databases(client)
const account = new Account(client)

export const createNote = data => {
  return databases.createDocument(
    database,
    '6558e325c72ed35a0b53',
    ID.unique(),
    data
  )
}

export const getNotes = id => {
  return databases.listDocuments(
      database,
    '655b54538172685242fd',
    [Query.equal('$id', id)]
  )
}

export const updateNoteStatus = (note, status) => {
  return databases.updateDocument(
      database,
    '6558e325c72ed35a0b53',
    note.$id,
    { status }
  )
}

export const updateNoteData = (note, data) => {
  return databases.updateDocument(
      database,
    '6558e325c72ed35a0b53',
    note.$id,
    data
  )
}

export const deleteNote = note => {
  return databases.deleteDocument(
      database,
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
      database,
    '655b54538172685242fd',
    [Query.equal('ownedBy', userId)]
  )
}

export const createBoard = data => {
  return databases.createDocument(
      database,
    '655b54538172685242fd',
    ID.unique(),
    data
  )
}

export const deleteBoard = board => {
  return databases.deleteDocument(
      database,
    '655b54538172685242fd',
    board.$id
  )
}
