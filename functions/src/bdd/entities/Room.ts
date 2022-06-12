import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Room{
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    isSecret!: boolean;
}