import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitModel1700046849984 implements MigrationInterface {
  name = 'InitModel1700046849984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shoes_ref_size" ("id" SERIAL NOT NULL, "size" integer NOT NULL, "quantity" integer NOT NULL, "shoesId" integer, CONSTRAINT "PK_57e6f20179e747fd2ad5c315f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shoes" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "material" character varying, "vendor" character varying, "company" character varying, "isBetterSell" boolean NOT NULL, "isNewArrival" boolean NOT NULL, "categoryId" integer, CONSTRAINT "REL_d4407a46d8cd5029e1517ed0b7" UNIQUE ("categoryId"), CONSTRAINT "PK_5367569fb93ba8de671a6890aae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "size" integer NOT NULL, "quantity" integer NOT NULL, "amount" integer NOT NULL, "isPaid" boolean NOT NULL, "isVerify" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" integer, "shoesId" integer, CONSTRAINT "REL_d3c8f6be080aa2944b2580f3f4" UNIQUE ("shoesId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" SERIAL NOT NULL, "userId" integer, "orderId" integer, CONSTRAINT "REL_ae4bf95cc793726b3e35f7ad98" UNIQUE ("orderId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" ADD CONSTRAINT "FK_a855162d1ea7022fcf690778f52" FOREIGN KEY ("shoesId") REFERENCES "shoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42" FOREIGN KEY ("shoesId") REFERENCES "shoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_ae4bf95cc793726b3e35f7ad982" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_ae4bf95cc793726b3e35f7ad982"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" DROP CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" DROP CONSTRAINT "FK_a855162d1ea7022fcf690778f52"`,
    );
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "shoes"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "shoes_ref_size"`);
  }
}
