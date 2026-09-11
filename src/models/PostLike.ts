import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class PostLike extends Model<InferAttributes<PostLike>, InferCreationAttributes<PostLike>> {
  declare postId: string;
  declare userId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initPostLike(sequelize: Sequelize): typeof PostLike {
  PostLike.init(
    {
      postId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'post_likes', modelName: 'PostLike', underscored: true, updatedAt: false },
  );
  return PostLike;
}