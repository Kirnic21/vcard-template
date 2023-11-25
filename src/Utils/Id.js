export const verificaId = () => {

    let cookie = {};

    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });

    if(cookie.id){
        return cookie.id;
    } else {
        return null;
    }   
};