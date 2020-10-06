import { query } from "express";
import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1601473961162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('events', new TableColumn({
        name: 'eventImage',
        type: 'varchar',
        isNullable: true,
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('events', 'eventImage')
    }

}
