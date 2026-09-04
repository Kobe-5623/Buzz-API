import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare caption: CreationOptional<string | null>;
  declare likesCount: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare updatedAt: CreationOptional<Date>;

}

export function initPost(sequelize: Sequelize): typeof Post {
  Post.init(
    {
      id: {type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID},
      userId: {type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id'},
      caption: {type: DataTypes.STRING(500), allowNull: true},
      likesCount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'likes_count'},
      createdAt: {type: DataTypes.DATE, allowNull: false, field: 'created_at'},
      deletedAt: {type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'deleted_at'},
      updatedAt: {type: DataTypes.DATE, allowNull: false, field: 'updated_at'},
    },
    {sequelize, tableName: 'posts', modelName: 'Post', underscored: true},
  );
  return Post;
}