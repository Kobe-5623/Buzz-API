import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('reports', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    reporter_id: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' } },
    post_id: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'posts', key: 'id' } },
    comment_id: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' } },
    reason: { type: DataTypes.ENUM('spam', 'harassment', 'inappropriate_content', 'false_information', 'something_else'), allowNull: false },
    details: { type: DataTypes.STRING(500), allowNull: true },
    status: { type: DataTypes.ENUM('pending', 'reviewed', 'dismissed', 'resolved'), allowNull: false, defaultValue: 'pending' },
    created_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('reports');
}