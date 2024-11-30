import { Association, BelongsToGetAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import connection from '@/config/dbConnect';
import Connect from './Connect';

interface TeleChatAttributes {
  id?: number;
  chatId?: number;
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  type?: string;
  lastCommand?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeleChatInput extends Optional<TeleChatAttributes, 'id'> {}
export interface TeleChatOutput extends Required<TeleChatAttributes> {}

class TeleChat extends Model<TeleChatAttributes, TeleChatInput> implements TeleChatAttributes
{
  declare id: number;
  declare chatId: number;
  declare title: string | null;
  declare firstName: string | null;
  declare lastName: string | null;
  declare username: string | null;
  declare type: string;
  declare lastCommand: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getConnect: BelongsToGetAssociationMixin<Connect>;

  static associations: {
    connect: Association<TeleChat, Connect>;
  };

  public async sendMessage(message: string, type?: string): Promise<void> {

    if (!type) {
      type = 'text';
    }

    const data = new URLSearchParams();
    data.append('chat_id', this.chatId.toString());
    data.append(type, message);

    const rawResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    });
    const content = await rawResponse.json();
    console.log(content);
  }
}

TeleChat.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT
  },
  chatId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'chat_id'
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING
  },
  firstName: {
    allowNull: true,
    field: 'first_name',
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: true,
    field: 'last_name',
    type: DataTypes.STRING
  },
  username: {
    allowNull: true,
    type: DataTypes.STRING
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastCommand: {
    allowNull: true,
    field: 'last_command',
    type: DataTypes.STRING
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
})

export default TeleChat;