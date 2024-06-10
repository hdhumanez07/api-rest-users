import { z } from 'zod';
import { IUser } from '../interfaces/user.interface';
import { Types } from 'mongoose';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1).max(50),
  phone: z.number().gte(3000000000).lte(3999999999),
  address: z.string().max(50),
  birthday: z.date(),
  city: z.string().refine((data) => Types.ObjectId.isValid(data)),
  department: z.string().refine((data) => Types.ObjectId.isValid(data)),
});

const updateUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(50),
  phone: z.number().gte(3000000000).lte(3999999999),
  address: z.string().max(50),
  birthday: z.date(),
  city: z.string().refine((data) => Types.ObjectId.isValid(data)),
  department: z.string().refine((data) => Types.ObjectId.isValid(data)),
});

const updateLogoSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const recoverPasswordSchema = z.object({
  password: z.string().min(6),
  code: z.number().gte(10000).lte(99999),
});

const validateEmail = (email: string) => {
  return z.string().email().safeParse(email);
};

const validatePassword = (password: string) => {
  return z.string().min(6).max(50).safeParse(password);
};

const validateRecoverPassword = (data: object) => {
  return recoverPasswordSchema.safeParse(data);
};

const validateUser = (data: IUser) => {
  return userSchema.safeParse({ ...data, phone: data.phone });
};

const validateUpdateUser = (data: IUser) => {
  return updateUserSchema.safeParse({ ...data, phone: data.phone });
};

const validateLogin = (data: object) => {
  return loginSchema.safeParse(data);
};

const validateUpdateLogo = (data: object) => {
  return updateLogoSchema.safeParse(data);
};

export {
  validateUser,
  validateUpdateUser,
  validateLogin,
  validateUpdateLogo,
  validateEmail,
  validatePassword,
  validateRecoverPassword,
};
