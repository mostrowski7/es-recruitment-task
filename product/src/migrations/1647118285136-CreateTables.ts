import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1647118285136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "serialNumber" integer NOT NULL, "price" numeric(9,2) NOT NULL DEFAULT '0', "amount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
