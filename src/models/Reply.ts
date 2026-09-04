import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';

export class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare commentId: string;
  declare content: string;
  declare likesCount: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare updatedAt: CreationOptional<Date>;

}

export function initReply(sequelize: Sequelize): typeof Reply {
  Reply.init(
    {
      id: {type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID},
      userId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id'},
      commentId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'comments', key: 'id' }, field: 'comment_id'},
      content: {type: DataTypes.STRING(500), allowNull: false},
      likesCount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'likes_count'},
      createdAt: {type: DataTypes.DATE, allowNull: false, field: 'created_at'},
      deletedAt: {type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'deleted_at'},
      updatedAt: {type: DataTypes.DATE, allowNull: false, field: 'updated_at'},
    },
    {sequelize,tableName: 'replies', modelName: 'Reply', underscored: true},
  );
  return Reply;
}