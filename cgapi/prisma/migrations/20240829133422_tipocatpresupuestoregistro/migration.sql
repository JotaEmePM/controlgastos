/*
  Warnings:

  - You are about to drop the `Egreso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingreso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Egreso_name_key";

-- DropIndex
DROP INDEX "Ingreso_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Egreso";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ingreso";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    CONSTRAINT "Categoria_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrigenDestino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Presupuesto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "monto" INTEGER NOT NULL,
    CONSTRAINT "Presupuesto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" INTEGER NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "necesario" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "origenId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    CONSTRAINT "Registro_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registro_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "OrigenDestino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registro_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "OrigenDestino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "factor" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Tipo" ("id", "name") SELECT "id", "name" FROM "Tipo";
DROP TABLE "Tipo";
ALTER TABLE "new_Tipo" RENAME TO "Tipo";
CREATE UNIQUE INDEX "Tipo_name_key" ON "Tipo"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
