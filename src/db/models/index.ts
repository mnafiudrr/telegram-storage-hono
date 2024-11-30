import Role from '@/db/models/Role';
import User from '@/db/models/User';
import TeleChat from '@/db/models/TeleChat';
import Connect from '@/db/models/Connect';
import Folder from './Folder';
import File from './File';

Connect.belongsTo(TeleChat, { foreignKey: 'chatId' });
TeleChat.hasOne(Connect, { foreignKey: 'chatId' });

Connect.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Connect, { foreignKey: 'userId' });

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

Folder.hasMany(Folder, { foreignKey: 'parentId' });
Folder.belongsTo(Folder, { foreignKey: 'parentId' });

Folder.belongsTo(TeleChat, { foreignKey: 'chatId' });
TeleChat.hasMany(Folder, { foreignKey: 'chatId' });

Folder.hasMany(File, { foreignKey: 'folderId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });

export { 
  Connect,
  Role,
  TeleChat,
  User
}