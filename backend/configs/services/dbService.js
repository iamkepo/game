import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    console.log("Connected "+process.env.MONGODB_NAME+" successfully");
  } catch (error) {
    console.error(error);
    await client.close();
  }
}

export const getTab = {
  users: client.db(process.env.MONGODB_NAME).collection('users'),
  teams: client.db(process.env.MONGODB_NAME).collection('teams'),
  colors: client.db(process.env.MONGODB_NAME).collection('colors'),
  tables: client.db(process.env.MONGODB_NAME).collection('tables'),
}

