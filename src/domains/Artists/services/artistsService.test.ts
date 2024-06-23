import { prismaMock } from '../../../../config/singleton';
import artistsService from './artistsService';
import { InvalidParamError } from '../../../../errors/errors/InvalidParamError';
import { QueryError } from '../../../../errors/errors/QueryError';
import { PermissionError } from '../../../../errors/errors/PermissionError';

describe('artistsService', () => {
    const service = new artistsService();

    describe('createArtist', () => {
        test('recebe os dados de um artista ==> cria um novo artista', async () => {
            const artist = { name: 'Artista Teste', photo: 'teste.jpg', streams: 1000 };
            prismaMock.artists.create.mockResolvedValue(artist);

            const result = await service.createArtist(artist);
            expect(result).toEqual(artist);
            expect(prismaMock.artists.create).toHaveBeenCalledWith({ data: artist });
        });

        test('lança InvalidParamError se o nome do artista não estiver presente', async () => {
            const artist = { photo: 'teste.jpg', streams: 1000 };

            await expect(service.createArtist(artist)).rejects.toThrow(
                new InvalidParamError("Deve-se constar o nome do artista para ele ser cadastrado.")
            );
        });

        test('lança QueryError se houver um erro ao criar o artista no banco de dados', async () => {
            const artist = { name: 'Artista Teste', photo: 'teste.jpg', streams: 1000 };
            prismaMock.artists.create.mockRejectedValue(new Error("Erro ao criar artista"));

            await expect(service.createArtist(artist)).rejects.toThrow(QueryError);
        });
    });

    describe('getArtistById', () => {
        test('recebe o id de um artista ==> busca o artista com o id informado', async () => {
            const artist = { id: 1, name: 'Artista Teste', photo: 'teste.jpg', streams: 1000 };
            prismaMock.artists.findUnique.mockResolvedValue(artist);

            const result = await service.getArtistById(1);
            expect(result).toEqual(artist);
            expect(prismaMock.artists.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        test('lança QueryError se houver um erro ao buscar o artista por id', async () => {
            prismaMock.artists.findUnique.mockRejectedValue(new Error("Erro ao buscar artista"));

            await expect(service.getArtistById(1)).rejects.toThrow(QueryError);
        });
    });

    describe('updateArtistById', () => {
        test('recebe o id e os dados de um artista ==> atualiza o artista com os dados informados', async () => {
            const artist = { id: 1, name: 'Artista Atualizado', photo: 'teste.jpg', streams: 2000 };
            prismaMock.artists.update.mockResolvedValue(artist);

            const result = await service.updateArtistById(1, artist);
            expect(result).toEqual(artist);
            expect(prismaMock.artists.update).toHaveBeenCalledWith({
                data: artist,
                where: { id: 1 }
            });
        });

        test('lança QueryError se houver um erro ao atualizar o artista por id', async () => {
            const artist = { id: 1, name: 'Artista Atualizado', photo: 'teste.jpg', streams: 2000 };
            prismaMock.artists.update.mockRejectedValue(new Error("Erro ao atualizar artista"));

            await expect(service.updateArtistById(1, artist)).rejects.toThrow(QueryError);
        });

        test('lança PermissionError se o usuário não tiver permissão para atualizar o artista', async () => {
            const artist = { id: 1, name: 'Artista 1', photo: null, streams: 1000 };
            const updatedArtist = { id: 2, name: 'Artista 2', photo: null, streams: 2000 };

            prismaMock.artists.findUnique.mockResolvedValue(artist);

            await expect(service.updateArtistById(1, updatedArtist)).rejects.toThrow(PermissionError);

            expect(prismaMock.artists.update).not.toHaveBeenCalled();
        });
    });

    describe('removeArtistById', () => {
        test('recebe o id de um artista ==> deleta o artista com o id informado', async () => {
            const artist = { id: 1, name: 'Artista Deletado', photo: 'teste.jpg', streams: 1000 };
            prismaMock.artists.delete.mockResolvedValue(artist);

            const result = await service.removeArtistById(1);
            expect(result).toEqual(artist);
            expect(prismaMock.artists.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        test('lança QueryError se houver um erro ao deletar o artista por id', async () => {
            prismaMock.artists.delete.mockRejectedValue(new Error("Erro ao deletar artista"));

            await expect(service.removeArtistById(1)).rejects.toThrow(QueryError);
        });
    });

    describe('getAllArtists', () => {
        test('retorna todos os artistas ordenados por nome', async () => {
            const artists = [
                { id: 1, name: 'Artista 1', photo: 'teste1.jpg', streams: 1000 },
                { id: 2, name: 'Artista 2', photo: 'teste2.jpg', streams: 2000 },
            ];
            prismaMock.artists.findMany.mockResolvedValue(artists);

            const result = await service.getAllArtists();
            expect(result).toEqual(artists);
            expect(prismaMock.artists.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
        });

        test('lança QueryError se houver um erro ao buscar todos os artistas', async () => {
            prismaMock.artists.findMany.mockRejectedValue(new Error("Erro ao buscar artistas"));

            await expect(service.getAllArtists()).rejects.toThrow(QueryError);
        });
    });

});
