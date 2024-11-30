import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import connection from "@/config/dbConnect";
import TeleChat from "./TeleChat";
import Folder from "./Folder";

interface FileAttributes {
  id?: number;
  folderId: number;
  chatId: number;
  name: string;
  path?: string;
  size?: number;
  mimes?: string;
  thumbnail?: string;
  source: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface FileInput extends Optional<FileAttributes, "id"> {}

class File
  extends Model<FileAttributes, FileInput>
  implements FileAttributes
{
  declare id: number;
  declare folderId: number;
  declare chatId: number;
  declare name: string;
  declare path: string;
  declare size: number;
  declare mimes: string;
  declare thumbnail: string;
  declare source: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getChat: BelongsToGetAssociationMixin<TeleChat>;

  static associations: {
    chat: Association<File, TeleChat>;
    folder: Association<File, Folder>;
  };
}

File.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    folderId: {
      field: "folder_id",
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    chatId: {
      field: "chat_id",
      allowNull: true,
      type: DataTypes.BIGINT,
      references: {
        model: "tele_chats",
        key: "id",
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.BIGINT,
    },
    mimes: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: true,
    getterMethods: {
      pathUrl: function () {
        return `/content/folder/${this.chatId}/${this.path}`;
      },
    },
  }
);

export default File;
