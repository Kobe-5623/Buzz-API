import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';
import { ALERT_TYPE, AlertType } from '../constants/alert.js';

export class Alert extends Model<InferAttributes<Alert>, InferCreationAttributes<Alert>> {
  declare id: CreationOptional<string>;
  declare authorId: string;
  declare actorId: string;
  declare type: AlertType;
  declare postId: CreationOptional<string | null>;
  declare commentId: CreationOptional<string | null>;
  declare isRead: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export function initAlert(sequelize: Sequelize): typeof Alert {
  Alert.init(
    {
      id: { type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID },
      authorId: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'author_id' },
      actorId: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'actor_id' },
      type: { type: DataTypes.ENUM(...ALERT_TYPE), allowNull: false },
      postId: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      commentId: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' }, field: 'comment_id' },
      isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_read' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'alerts', modelName: 'Alert', underscored: true, updatedAt: false },
  );
  return Alert;
}