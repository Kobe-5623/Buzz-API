import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Repost extends Model<InferAttributes<Repost>, InferCreationAttributes<Repost>> {
  declare postId: string;
  declare userId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initRepost(sequelize: Sequelize): typeof Repost {
  Repost.init(
    {
      postId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'reposts', modelName: 'Repost', underscored: true, updatedAt: false },
  );
  return Repost;
}