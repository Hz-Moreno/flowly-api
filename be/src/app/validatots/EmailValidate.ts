export function emailValidate(email: string): boolean {
  const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string") {
    return false;
  }

  return rgx.test(email);
}
