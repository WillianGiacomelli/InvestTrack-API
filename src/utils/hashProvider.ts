import { compare, hash } from "bcryptjs";

const generateHash = async (password) => {
    return hash(password, 8);
}

const compareHash = async (password, hashedPassword) => {
    return compare(password, hashedPassword);
}

export { generateHash, compareHash };