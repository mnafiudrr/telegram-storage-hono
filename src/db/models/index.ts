import Role from '@/db/models/Role';
import User from '@/db/models/User';
import TeleChat from '@/db/models/TeleChat';
import Connect from '@/db/models/Connect';

Connect.belongsTo(TeleChat, { foreignKey: 'chatId' });
TeleChat.hasOne(Connect, { foreignKey: 'chatId' });

Connect.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Connect, { foreignKey: 'userId' });

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

export { 
  Connect,
  Role,
  TeleChat,
  User
}