-- CreateTable
CREATE TABLE "Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT,
    "privilegio" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Artistas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "streams" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Musicas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artistasId" INTEGER NOT NULL,
    CONSTRAINT "Musicas_artistasId_fkey" FOREIGN KEY ("artistasId") REFERENCES "Artistas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MusicasToUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MusicasToUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "Musicas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MusicasToUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicasToUsuarios_AB_unique" ON "_MusicasToUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicasToUsuarios_B_index" ON "_MusicasToUsuarios"("B");
