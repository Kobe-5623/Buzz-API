import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('admins', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(72), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('users');
}