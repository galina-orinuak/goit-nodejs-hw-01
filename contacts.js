import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

export const removeContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.find((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };
  await listContacts(contacts);
  return contacts[index];
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};
