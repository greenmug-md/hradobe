import Joi from "@hapi/joi";
import { getRepository } from "typeorm";
import BadParameterError from "../errors/BadParameterError";
import UserDB, { Role } from "../models/UserDB";

/**
 * Get user by credentials
 * @param username
 * @param password
 * @returns The UserDB object
 */
async function getByCredentials(
  username: string,
  password: string,
  role: string
): Promise<UserDB | undefined> {
  Joi.assert(
    {
      username,
      password,
      role,
    },
    Joi.object({
      username: Joi.string().trim().required(),
      password: Joi.string().required(),
      role: Joi.string().valid(...Object.values(Role)),
    })
  );

  return await getRepository(UserDB).findOne({
    where: {
      username,
      password,
      role,
    },
  });
}

/**
 * Verify if username is already registered
 * @param username
 */
async function usernameAlreadyRegistered(username: string): Promise<boolean> {
  Joi.assert(
    {
      username,
    },
    Joi.object({
      username: Joi.string().trim().required(),
    })
  );

  const userDB: UserDB | undefined = await getRepository(UserDB).findOne({
    where: { username },
  });

  return userDB !== undefined;
}

/**
 * Verify if emailAlreadyRegistered is already registered
 * @param email
 */
async function emailAlreadyRegistered(email: string): Promise<boolean> {
  Joi.assert(
    {
      email,
    },
    Joi.object({
      email: Joi.string().trim().required(),
    })
  );

  const userDB: UserDB | undefined = await getRepository(UserDB).findOne({
    where: { email },
  });

  return userDB !== undefined;
}

export interface ICreateUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  company: string;
  email: string;
  role: Role;
}

/**
 * Create an user
 * @param username
 * @param password
 * @param role
 * @param email
 * @param company
 * @param firstname
 * @param lastname
 */
async function create(createUser: ICreateUser): Promise<void> {
  Joi.assert(
    createUser,
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
      company: Joi.string().required(),
      email: Joi.string().required(),
      role: Joi.string().valid(...Object.values(Role)),
    })
  );

  if (await usernameAlreadyRegistered(createUser.username))
    throw new BadParameterError("Username already registered");

  if (await emailAlreadyRegistered(createUser.email))
    throw new BadParameterError("Email already registered");

  const newUserDB = new UserDB();

  newUserDB.username = createUser.username;
  newUserDB.password = createUser.password;
  newUserDB.firstname = createUser.firstname;
  newUserDB.lastname = createUser.lastname;
  newUserDB.company = createUser.company;
  newUserDB.email = createUser.email;
  newUserDB.role = createUser.role;

  await getRepository(UserDB).save(newUserDB);
}

export default {
  create,
  usernameAlreadyRegistered,
  emailAlreadyRegistered,
  getByCredentials,
};
