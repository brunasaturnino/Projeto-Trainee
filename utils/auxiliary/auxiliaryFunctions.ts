export function isValidEmail(email : string) {

    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email !== '' && email.match(emailFormat))
        return true;
    
    return false;
}


export function isValidPhoto(photo : string) {

    var photoFormat = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;

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




