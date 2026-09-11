import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class SavedPost extends Model<InferAttributes<SavedPost>, InferCreationAttributes<SavedPost>> {
  declare userId: string;
  declare postId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initSavedPost(sequelize: Sequelize): typeof SavedPost {
  SavedPost.init(
    {
      userId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'user_id' },
      postId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'saved_posts', modelName: 'SavedPost', underscored: true, updatedAt: false },
  );
  return SavedPost;
}