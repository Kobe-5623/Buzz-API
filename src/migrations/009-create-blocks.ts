import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('blocks', {
    blocker_id: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' } },
    blocked_id: { type: DataTypes.STRING(26), primaryKey: true, references: { model: 'users', key: 'id' } },
    created_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('blocks');
}