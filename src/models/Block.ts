import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Block extends Model<InferAttributes<Block>, InferCreationAttributes<Block>> {
  declare blockerId: string;
  declare blockedId: string;
  declare createdAt: CreationOptional<Date>;
}

export function initBlock(sequelize: Sequelize): typeof Block {
  Block.init(
    {
      blockerId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'blocker_id' },
      blockedId: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' }, field: 'blocked_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'blocks', modelName: 'Block', underscored: true, updatedAt: false },
  );
  return Block;
}