/*
  Warnings:

  - You are about to drop the `_MusicasToUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `numeroDeStreams` on the `Artistas` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Musicas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_MusicasToUsuarios_B_index";

-- DropIndex
DROP INDEX "_MusicasToUsuarios_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MusicasToUsuarios";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Musicas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artistaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Musicas_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artistas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Musicas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Musicas" ("album", "artistaId", "genero", "id", "nome") SELECT "album", "artistaId", "genero", "id", "nome" FROM "Musicas";
DROP TABLE "Musicas";
ALTER TABLE "new_Musicas" RENAME TO "Musicas";
CREATE TABLE "new_Artistas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "streams" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Artistas" ("foto", "id", "nome") SELECT "foto", "id", "nome" FROM "Artistas";
DROP TABLE "Artistas";
ALTER TABLE "new_Artistas" RENAME TO "Artistas";
PRAGMA foreign_key_check("Musicas");
PRAGMA foreign_key_check("Artistas");
PRAGMA foreign_keys=ON;
