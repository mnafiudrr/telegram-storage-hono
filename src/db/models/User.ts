import { DataTypes, Model } from 'sequelize';
import connection from '@/config/dbConnect';

interface UserAttributes {
  id?: number;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  roleId?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare roleId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

}

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: {
        msg: 'email must be provided',
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  roleId: {
    field: 'role_id',
    type: DataTypes.BIGINT,
    references: {
      model: 'roles',
      key: 'id'
    }
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

export default User;