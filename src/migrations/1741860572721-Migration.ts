import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741860572721 implements MigrationInterface {
  name = 'Migration1741860572721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."links_status_enum" AS ENUM('DONE', 'NEW', 'PROCESSING', 'ERROR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "links" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "status" "public"."links_status_enum" NOT NULL DEFAULT 'NEW', "http_code" character varying, CONSTRAINT "UQ_ff2e76673883ad4ea9f92fe32b8" UNIQUE ("url"), CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "links"`);
    await queryRunner.query(`DROP TYPE "public"."links_status_enum"`);
  }
}
