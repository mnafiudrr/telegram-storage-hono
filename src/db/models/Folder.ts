import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import connection from "@/config/dbConnect";
import TeleChat from "./TeleChat";
import File from "./File";

interface FolderAttributes {
  id?: number;
  parentId?: number | null;
  chatId: number;
  name?: string;
  path?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface FolderInput extends Optional<FolderAttributes, "id"> {}
class Folder
  extends Model<FolderAttributes, FolderInput>
  implements FolderAttributes
{
  declare id: number;
  declare parentId: number;
  declare chatId: number;
  declare name: string;
  declare path: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getChat: BelongsToGetAssociationMixin<TeleChat>;
  declare getFiles: HasManyAddAssociationMixin<File, number>;

  static associations: {
    chat: Association<Folder, TeleChat>;
  };

  static associate() {
    Folder.hasMany(File, {
      foreignKey: "folderId",
    })
  }
}

Folder.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    parentId: {
      field: "parent_id",
      allowNull: true,
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

export default Folder;
