import { React, useState } from "react";
import "../Login/login.css";
import validarEmail  from "../../Utils/validarEmail"
import validarSenha from "../../Utils/validarSenha"

const Login = () => {
	const [loading, setLoading] = useState()
	const [input, setInput] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true)
			alert('Login')
			setLoading(false)
		} catch (error) {
			alert('Algo deu errado com o Login' + erro)
		}
	}

	const handleChange = (e) => {
		console.log('Digitando...', e.target.name, e.target.value)
		setInput({...input, [e.target.name]: e.target.value})
		console.log('Input', input)
	}

	const validadorInput = () => {
		return validarEmail(input.email) && validarSenha(input.password)
	}

	//console.log("Formulario está valido?", validadorInput())


    return (
        <>
		<div className="container">
			<h1>Faça seu Login</h1>
			<h5>Configure seu cartão digital</h5>
					<div className="login">
						<label htmlFor="email">Digite seu e-mail</label>
						<input
							placeholder='E-mail'
							name='email'
							autoComplete='username'
							id='email'
							onChange={handleChange} 
							/* value={email} */
						/>
						<p></p>
						<label htmlFor="password">Digite sua senha</label>
						<input
							type='password'
							name='password'
							placeholder='*********'
							autoComplete='current-password'
							id='senha'
							onChange={handleChange} 
							/* value={pwd} */
						/>
						<p></p>
						<button
							type='submit'
							onClick={handleSubmit}
							disabled={loading === true || !validadorInput()}
						>
							Entrar
						</button>
					</div>
                    <p>Se você ainda não tem conta peça para um administrador te encaminhar o link para cadastro.</p>
				</div>
        </>
    )
}

export default Login;