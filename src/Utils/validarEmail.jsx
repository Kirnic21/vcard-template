const validarEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.')
}

export default validarEmail 
