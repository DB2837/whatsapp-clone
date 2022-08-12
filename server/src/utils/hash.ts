import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, rounds: number) => {
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassowrd = await bcrypt.hash(password, salt);

  return hashedPassowrd;
};

export const comparePasswords = async (
  candidatePassword: string,
  userHashedPassword: string
) => await bcrypt.compare(candidatePassword, userHashedPassword);
