import { Association, BelongsToGetAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import connection from '@/config/dbConnect';
import User from './User';
import TeleChat from './TeleChat';

interface ConnectAttributes {
  id?: number;
  userId?: number;
  key?: string;
  chatId?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

interface ConnectInput extends Optional<ConnectAttributes, 'id'> {}
interface ConnectOutput extends Required<ConnectAttributes> {}

class Connect extends Model<ConnectAttributes, ConnectInput> implements ConnectAttributes
{
  declare id: number;
  declare userId: number;
  declare key: string;
  declare chatId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getChat: BelongsToGetAssociationMixin<TeleChat>;

  static associations: {
    user: Association<Connect, User>;
    chat: Association<Connect, TeleChat>;
  };
}

Connect.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.BIGINT,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  key: {
    allowNull: false,
    type: DataTypes.STRING
  },
  chatId: {
    field: 'chat_id',
    allowNull: true,
    type: DataTypes.BIGINT,
    references: {
      model: 'tele_chats',
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

export default Connect;