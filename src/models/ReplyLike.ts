import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class ReplyLike extends Model<InferAttributes<ReplyLike>, InferCreationAttributes<ReplyLike>> {
  declare replyId: string;
  declare userId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initReplyLike(sequelize: Sequelize): typeof ReplyLike {
  ReplyLike.init(
    {
      replyId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'replies', key: 'id' }, field: 'reply_id' },
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'reply_likes', modelName: 'ReplyLike', underscored: true, updatedAt: false },
  );
  return ReplyLike;
}