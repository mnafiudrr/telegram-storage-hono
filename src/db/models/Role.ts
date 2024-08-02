import { DataTypes, Model, Optional } from 'sequelize';
import connection from '@/config/dbConnect';

interface RoleAttributes {
  id?: number;
  name?: string | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, 'id'>{ }
export interface RoleOutput extends Required<RoleAttributes> { }

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  declare id: number;
  declare name: string;
  declare active: boolean;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Role.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
});

export default Role;