export const hash = async (password: string): Promise<string> => {
  return await Bun.password.hash(password);
}

export const checkHash = async (password: string, hashed: string): Promise<boolean> => {
  return await Bun.password.verify(password, hashed);
}