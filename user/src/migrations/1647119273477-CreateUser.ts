import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1647119273477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "role") VALUES (DEFAULT, 'admin123', 'admin123', 'ADMIN')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
