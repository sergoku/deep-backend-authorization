import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: "roles",
})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: "1", description: "unique identificator" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "ADMIN", description: "unique role of user" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "administrator", description: "description of role" })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
