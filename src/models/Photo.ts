import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';

export class Photo extends Model<InferAttributes<Photo>, InferCreationAttributes<Photo>> {
  declare id: CreationOptional<string>;
  declare postId: string;
  declare url: string;
  declare createdAt: CreationOptional<Date>;
}

export function initPhoto(sequelize: Sequelize): typeof Photo {
  Photo.init(
    {
      id: {type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID },
      postId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'posts', key: 'id' },field: 'post_id',},
      url: {type: DataTypes.STRING(255), allowNull: false },
      createdAt: {type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    {sequelize, tableName: 'photos', modelName: 'Photo', underscored: true, updatedAt: false,},
  );
  return Photo;
}