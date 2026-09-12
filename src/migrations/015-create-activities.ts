import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('activities', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    user_id: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' } },
    type: { type: DataTypes.ENUM('likes', 'posts', 'reposts', 'comments'), allowNull: false },
    post_id: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'posts', key: 'id' } },
    comment_id: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' } },
    created_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('activities');
}