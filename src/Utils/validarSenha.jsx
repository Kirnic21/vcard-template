const validarSenha = (senha) => {
    return senha?.toString().length >= 8
}

export default validarSenha