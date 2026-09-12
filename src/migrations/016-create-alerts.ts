import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('alerts', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    author_id: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' } },
    actor_id: { type: DataTypes.STRING(26), allowNull: false, references: { model: 'users', key: 'id' } },
    type: { type: DataTypes.ENUM('like', 'comment', 'reply', 'save', 'repost', 'followed'), allowNull: false },
    post_id: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'posts', key: 'id' } },
    comment_id: { type: DataTypes.STRING(26), allowNull: true, references: { model: 'comments', key: 'id' } },
    is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('alerts');
}