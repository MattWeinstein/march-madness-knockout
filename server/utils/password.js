import bcrypt from 'bcrypt';

const generateHash = function (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    
    return hash
}

export default generateHash;