import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';
import { COURSES, Course } from '../constants/user.js';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare passwordHash: string;
  declare lastName: string;
  declare firstName: string;
  declare middleName: CreationOptional<string | null>;
  declare studentNumber: string;
  declare instiEmail: string;
  declare course: Course;
  declare profileImage: CreationOptional<string | null>;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  toSafeJSON(): SafeUser {
    return {
      id: this.id,
      username: this.username,
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      studentNumber: this.studentNumber,
      instiEmail: this.instiEmail,
      course: this.course,
      profileImage: this.profileImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export interface SafeUser {
  id: string;
  username: string;
  lastName: string;
  firstName: string;
  middleName: string | null;
  studentNumber: string;
  instiEmail: string;
  course: Course;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {type: DataTypes.STRING(26),primaryKey: true,defaultValue: generateID,},
      username: {type: DataTypes.STRING(30),allowNull: false,unique: true,},
      passwordHash: {type: DataTypes.STRING(255),allowNull: false,field: 'password_hash',},
      lastName: {type: DataTypes.STRING(20),allowNull: false,field: 'last_name',},
      firstName: {type: DataTypes.STRING(50),allowNull: false,field: 'first_name',},
      middleName: {type: DataTypes.STRING(20),allowNull: true,field: 'middle_name',},
      studentNumber: {type: DataTypes.STRING(7),allowNull: false,unique: true,field: 'student_number',},
      instiEmail: {type: DataTypes.STRING(100),allowNull: false,unique: true,field: 'insti_email',},
      course: {type: DataTypes.ENUM(...COURSES),allowNull: false,},
      profileImage: {type: DataTypes.STRING(255),allowNull: true,field: 'profile_image',},
      deletedAt: {type: DataTypes.DATE,allowNull: true,defaultValue: null,field: 'deleted_at',},
      createdAt: {type: DataTypes.DATE,allowNull: false,field: 'created_at',},
      updatedAt: {type: DataTypes.DATE,allowNull: false,field: 'updated_at',},
    },
    {sequelize,tableName: 'users',modelName: 'User',underscored: true,},
  );
  return User;
}