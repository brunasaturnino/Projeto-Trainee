/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Musicas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Musicas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artistaId" INTEGER NOT NULL,
    CONSTRAINT "Musicas_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artistas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Musicas" ("album", "artistaId", "genero", "id", "nome") SELECT "album", "artistaId", "genero", "id", "nome" FROM "Musicas";
DROP TABLE "Musicas";
ALTER TABLE "new_Musicas" RENAME TO "Musicas";
PRAGMA foreign_key_check("Musicas");
PRAGMA foreign_keys=ON;
