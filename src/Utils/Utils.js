export const verificaLogin = () => {

        let cookie = {};
    
        document.cookie.split(";").forEach(function (el) {
          let [key, value] = el.split("=");
          cookie[key.trim()] = value;
        });
    
        if(cookie.permission){
            return cookie.permission;
        } else {
            return null;
        }
        
};