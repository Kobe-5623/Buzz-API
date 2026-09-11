import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class CommentLike extends Model<InferAttributes<CommentLike>, InferCreationAttributes<CommentLike>> {
  declare commentId: string;
  declare userId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initCommentLike(sequelize: Sequelize): typeof CommentLike {
  CommentLike.init(
    {
      commentId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'comments', key: 'id' }, field: 'comment_id' },
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'comment_likes', modelName: 'CommentLike', underscored: true, updatedAt: false },
  );
  return CommentLike;
}