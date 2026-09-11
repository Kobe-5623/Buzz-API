import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class HiddenPost extends Model<InferAttributes<HiddenPost>, InferCreationAttributes<HiddenPost>> {
  declare userId: string;
  declare postId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initHiddenPost(sequelize: Sequelize): typeof HiddenPost {
  HiddenPost.init(
    {
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      postId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'hidden_posts', modelName: 'HiddenPost', underscored: true, updatedAt: false },
  );
  return HiddenPost;
}