import type { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';

interface MigrationContext { context: QueryInterface }

export async function up({ context }: MigrationContext): Promise<void> {
  await context.createTable('users', {
    id: { type: DataTypes.STRING(26), primaryKey: true },
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(72), allowNull: false },
    surname: { type: DataTypes.STRING(100), allowNull: false },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    middle_name: { type: DataTypes.STRING(100), allowNull: true },
    student_number: { type: DataTypes.STRING(7), allowNull: false, unique: true },
    insti_email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    course: {type: DataTypes.ENUM('BSCS', 'BSBA', 'BSTM', 'BSA', 'BSHM', 'BSED'),allowNull: false},
    profile_image: { type: DataTypes.STRING(255), allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });
}

export async function down({ context }: MigrationContext): Promise<void> {
  await context.dropTable('users');
}