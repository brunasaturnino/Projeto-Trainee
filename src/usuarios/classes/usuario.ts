export class Usuario {
    
    nome : string;
    email : string;
    senha : string;
    foto : string;
    privilegio : boolean

    constructor(nome : string, email : string, senha : string, foto : string, privilegio : boolean)
    {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.foto = foto;
        this.privilegio = privilegio
    }
};

