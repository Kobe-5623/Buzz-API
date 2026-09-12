import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';
import { ACTIVITY_TYPE, ActivityType } from '../constants/activity.js';

export class Activity extends Model<InferAttributes<Activity>, InferCreationAttributes<Activity>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare type: ActivityType;
  declare postId: string;
  declare commentId: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
}

export function initActivity(sequelize: Sequelize): typeof Activity {
  Activity.init(
    {
      id: { type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID },
      userId: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
      type: { type: DataTypes.ENUM(...ACTIVITY_TYPE), allowNull: false },
      postId: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      commentId: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' }, field: 'comment_id' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'activities', modelName: 'Activity', underscored: true, updatedAt: false },
  );
  return Activity;
}