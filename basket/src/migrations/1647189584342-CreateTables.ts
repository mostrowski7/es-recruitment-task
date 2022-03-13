import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1647189584342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" integer NOT NULL, "amount" integer NOT NULL, "basketId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "basket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
