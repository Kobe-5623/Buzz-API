import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare postId: string;
  declare content: string;
  declare likesCount: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare updatedAt: CreationOptional<Date>;

}

export function initComment(sequelize: Sequelize): typeof Comment {
  Comment.init(
    {
      id: {type: DataTypes.STRING(26),primaryKey: true,defaultValue: generateID},
      userId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' },field: 'user_id'},
      postId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'posts', key: 'id' },field: 'post_id'},
      content: {type: DataTypes.STRING(500), allowNull: false},
      likesCount: {type: DataTypes.INTEGER,allowNull: false, defaultValue: 0, field: 'likes_count'},
      createdAt: {type: DataTypes.DATE, allowNull: false, field: 'created_at'},
      deletedAt: {type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'deleted_at'},
      updatedAt: {type: DataTypes.DATE, allowNull: false, field: 'updated_at'},
    },
    {sequelize,tableName: 'comments',modelName: 'Comment',underscored: true},
  );
  return Comment;
}