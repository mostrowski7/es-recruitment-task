import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrder1647042378116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "basketId" uuid NOT NULL, "userId" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "city" character varying NOT NULL, "postalCode" character varying NOT NULL, "street" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
