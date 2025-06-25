-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "raca" TEXT,
    "nascimento" DATETIME,
    "peso" TEXT,
    "sexo" TEXT,
    "estagioDeVida" TEXT,
    "loteId" INTEGER,
    CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria" TEXT NOT NULL,
    "piqueteId" INTEGER,
    CONSTRAINT "Lote_piqueteId_fkey" FOREIGN KEY ("piqueteId") REFERENCES "Piquete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Piquete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "atividade" TEXT NOT NULL,
    "cultivo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_identificador_key" ON "Animal"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_piqueteId_key" ON "Lote"("piqueteId");
