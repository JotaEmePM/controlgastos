-- CreateTable
CREATE TABLE "Tipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ingreso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    CONSTRAINT "Ingreso_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Egreso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    CONSTRAINT "Egreso_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_name_key" ON "Tipo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingreso_name_key" ON "Ingreso"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Egreso_name_key" ON "Egreso"("name");
