import React from "react";
import "../Login/login.css";

const Login = () => {


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
							autocomplete='username'
							id='email'
							/* onChange={e => setEmail(e.target.value)} */
							/* value={email} */
						/>
						<p></p>
						<label htmlFor="password">Digite sua senha</label>
						<input
							type='password'
							name='password'
							placeholder='*********'
							autocomplete='current-password'
							id='senha'
							/* onChange={e => setPwd(e.target.value)} */
							/* value={pwd} */
						/>
						<p></p>
						<button
							type='submit'
							className="submit"
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