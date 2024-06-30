export function isValidEmail(email : string) {

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email !== '' && email.match(emailFormat))
        return true;
    
    return false;
}


export function isValidPhoto(photo : string | null) {

    if (photo == null)
        return false;

    const photoFormat = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

    if (photo !== '' && photo.match(photoFormat))
        return true;
    
    return false;

}


export function isValidPrivileges(privileges : boolean) {

    return privileges == true || privileges == false;

}

export  function isEmpty(name : string) {

    return name == "";
}

export  function stringtoBoolean(value : string) {

    return value == "true";
}

export function isValidId(id : number) {
    return (id > 0);
}




