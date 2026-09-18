import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';
import { USER_STATUS, UserStatus } from '../constants/user.js';

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare passwordHash: string;
  declare email: string;
  declare status: CreationOptional<UserStatus>;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  toSafeJSON(): SafeAdmin{
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      status: this.email,
      deletedAt: this.deletedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export interface SafeAdmin {
  id: string;
  username: string;
  email: string;
  status: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function initAdmin(sequelize: Sequelize): typeof Admin {
  Admin.init(
    {
      id: {type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID},
      username: {type: DataTypes.STRING(20), allowNull: false,unique: true},
      passwordHash: {type: DataTypes.STRING(72), allowNull: false, field: 'password_hash'},
      email: {type: DataTypes.STRING(255), allowNull: false, unique: true},
      status: {type: DataTypes.ENUM(...USER_STATUS), allowNull: false},
      deletedAt: {type: DataTypes.DATE, allowNull: true, field: 'deleted_at'},
      createdAt: {type: DataTypes.DATE, allowNull: false, field: 'created_at'},
      updatedAt: {type: DataTypes.DATE, allowNull: false, field: 'updated_at'},
    },
    {sequelize, tableName: 'admins', modelName: 'Admin', underscored: true},
  );
  return Admin;
}