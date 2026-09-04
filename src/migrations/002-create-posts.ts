import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('posts', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    user_id: {type: DataTypes.STRING(26),allowNull: false,references: { model: 'users', key: 'id' },},
    caption: { type: DataTypes.STRING(500), allowNull: true },
    likes_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('posts');
}