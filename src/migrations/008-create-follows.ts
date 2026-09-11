import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('follows', {
    follower_id: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' } },
    following_id: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' } },
    created_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('follows');
}