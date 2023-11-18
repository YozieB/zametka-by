import { Client, Databases, ID } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6553a218b0966f5f5f85')

const databases = new Databases(client)

export const createNote = data => {
  return databases.createDocument(
    '6553c3b28d397388abdc',
    '6558e325c72ed35a0b53',
    ID.unique(),
    data
  )
}

export const getNotes = () => {
  return databases.listDocuments('6553c3b28d397388abdc', '6558e325c72ed35a0b53')
}
