'use server'
import { Client, Account, Databases, Storage, Avatars } from 'node-appwrite';
import { configAppwrite } from './config';
import { createSearchParamsFromClient } from 'next/dist/server/request/search-params';
import { cookies } from 'next/headers';


const client = new Client();


export const createSeassionClient=async() => {
    client
    .setEndpoint(configAppwrite.endpoint) 
    .setProject(configAppwrite.project) 

    const session = (await cookies()).get('appwrite-session')

    if(!session || !session.value) throw new Error("no session")

        client.setSession(session.value)

        return {
            get account() {
              return new Account(client);
            },
            get databases() {
              return new Databases(client);
            },
          };
    
}
export const createAdminClient=async() => {
    client
    .setEndpoint(configAppwrite.endpoint) 
    .setProject(configAppwrite.project).setKey(configAppwrite.scurtyId)

        return {
            get account() {
              return new Account(client);
            },
            get databases() {
              return new Databases(client);
            },
            get storage(){
                return new Storage(client)
            },

            get avatar(){
                return new Avatars(client)
            }
            
          };
    
}

