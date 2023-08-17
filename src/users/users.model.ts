import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "unique identificator" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "user@gmail.com", description: "email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "12345", description: "password" })
  password: string;
  @ApiProperty({ example: "true", description: "user is blocked" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  @ApiProperty({ example: "bad behaviour", description: "reason" })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
