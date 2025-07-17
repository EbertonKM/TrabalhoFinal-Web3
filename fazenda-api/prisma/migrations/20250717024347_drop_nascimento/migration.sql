/*
  Warnings:

  - You are about to drop the column `estagioDeVida` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `nascimento` on the `Animal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "raca" TEXT,
    "peso" TEXT,
    "sexo" TEXT,
    "loteId" INTEGER,
    CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("id", "identificador", "loteId", "peso", "raca", "sexo") SELECT "id", "identificador", "loteId", "peso", "raca", "sexo" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE UNIQUE INDEX "Animal_identificador_key" ON "Animal"("identificador");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
