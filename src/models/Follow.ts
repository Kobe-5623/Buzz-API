import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Follow extends Model<InferAttributes<Follow>, InferCreationAttributes<Follow>> {
  declare followerId: string;
  declare followingId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initFollow(sequelize: Sequelize): typeof Follow {
  Follow.init(
    {
      followerId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'follower_id' },
      followingId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'following_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'follows', modelName: 'Follow', underscored: true, updatedAt: false },
  );
  return Follow;
}