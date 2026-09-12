import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('photos', {
    id: {type: DataTypes.STRING(26), primaryKey: true},
    post_id: {type: DataTypes.STRING(26),allowNull: false,references: { model: 'posts', key: 'id' }},
    url: {type: DataTypes.STRING(255), allowNull: false},
    created_at: {type: DataTypes.DATE, allowNull: false},
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('photos');
}