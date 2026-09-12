import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { generateID } from '../utils/idGenerator.js';
import { REPORT_REASON, REPORT_STATUS, ReportReason, ReportStatus } from '../constants/report.js';

export class Report extends Model<InferAttributes<Report>, InferCreationAttributes<Report>> {
  declare id: CreationOptional<string>;
  declare reporterId: string;
  declare postId: CreationOptional<string | null>;
  declare commentId: CreationOptional<string | null>;
  declare reason: ReportReason;
  declare details: CreationOptional<string | null>;
  declare status: CreationOptional<ReportStatus>;
  declare createdAt: CreationOptional<Date>;
}

export function initReport(sequelize: Sequelize): typeof Report {
  Report.init(
    {
      id: { type: DataTypes.STRING(26), primaryKey: true, defaultValue: generateID },
      reporterId: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' }, field: 'reporter_id' },
      postId: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'posts', key: 'id' }, field: 'post_id' },
      commentId: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' }, field: 'comment_id' },
      reason: { type: DataTypes.ENUM(...REPORT_REASON), allowNull: false },
      details: { type: DataTypes.STRING(500), allowNull: true },
      status: { type: DataTypes.ENUM(...REPORT_STATUS), allowNull: false, defaultValue: 'pending' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    },
    { sequelize, tableName: 'reports', modelName: 'Report', underscored: true, updatedAt: false },
  );
  return Report;
}