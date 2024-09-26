import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimeStampOrder1727365544621 implements MigrationInterface {
  name = 'AddTimeStampOrder1727365544621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "role" TO "isAdmin"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "quantity"`);
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" ADD "updatedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "image" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updatedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD "image" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD "updatedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "timestamp" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "inCart" boolean DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "description" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "updatedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" DROP CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" DROP CONSTRAINT "REL_d4407a46d8cd5029e1517ed0b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "REL_d3c8f6be080aa2944b2580f3f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42" FOREIGN KEY ("shoesId") REFERENCES "shoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" DROP CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "REL_d3c8f6be080aa2944b2580f3f4" UNIQUE ("shoesId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_d3c8f6be080aa2944b2580f3f42" FOREIGN KEY ("shoesId") REFERENCES "shoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD CONSTRAINT "REL_d4407a46d8cd5029e1517ed0b7" UNIQUE ("categoryId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes" ADD CONSTRAINT "FK_d4407a46d8cd5029e1517ed0b7c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "inCart"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "timestamp"`);
    await queryRunner.query(`ALTER TABLE "shoes" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "shoes" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "shoes" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "shoes" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "shoes" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shoes_ref_size" DROP COLUMN "isDeleted"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "isAdmin" TO "role"`,
    );
  }
}
