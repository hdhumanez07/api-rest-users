import { IUser } from '../interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';
import UserModel from '../models/user.model';
import { validateUser, validateLogin } from '../schemas/user.schema';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';
import { ERROR_HANDLE } from '../utils/constants/error.handle';
const {
  USER_ALREADY_EXISTS,
  INVALID_PAYLOAD,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
} = ERROR_HANDLE;

const registerNewUser = async (newUser: IUser) => {
  const validatePayload = validateUser(newUser);
  if (!validatePayload.success) {
    return {
      error: INVALID_PAYLOAD.KEY,
      data: validatePayload.error.message,
    };
  }
  const checkIs = await UserModel.findOne({ email: newUser.email });
  if (checkIs) {
    return {
      error: USER_ALREADY_EXISTS.KEY,
    };
  }
  const passwordHash = await encrypt(newUser.password);
  const createUser = await UserModel.create({
    ...newUser,
    password: passwordHash,
  });
  return {
    data: createUser,
  };
};

const loginUser = async ({ email, password }: IAuth) => {
  // First we validate the payload to avoid making unnecessary queries to the database
  const validatePayload = validateLogin({ email, password });
  if (!validatePayload.success) {
    return {
      error: INCORRECT_PASSWORD.KEY,
    };
  }
  const checkIs = await UserModel.findOne({ email }).populate(
    'city department',
  );

  if (!checkIs) {
    return {
      error: USER_NOT_FOUND.KEY,
    };
  }

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) {
    return {
      error: INCORRECT_PASSWORD.KEY,
    };
  }

  console.log(checkIs.id);
  const token = generateToken(checkIs.id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = checkIs.toObject();

  return { token, user: userWithoutPassword };
};

export { registerNewUser, loginUser };
