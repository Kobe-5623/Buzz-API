import { sequelize } from '../config/database.js';
import { initUser } from './User.js';

export const User = initUser(sequelize);
export { sequelize };
