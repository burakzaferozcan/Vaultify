interface GeneratePasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export function generatePassword({
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
}: GeneratePasswordOptions): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (chars === "") chars = lowercase + numbers; // Default fallback

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  // Ensure at least one character from each selected type
  const requiredChars = [];
  if (includeUppercase) requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
  if (includeLowercase) requiredChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
  if (includeNumbers) requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
  if (includeSymbols) requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);

  // Replace first few characters with required ones
  for (let i = 0; i < requiredChars.length; i++) {
    password = password.slice(0, i) + requiredChars[i] + password.slice(i + 1);
  }

  return password;
}
