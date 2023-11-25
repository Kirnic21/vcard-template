import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import { verificaLogin } from "../../Utils/utils";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [error, setError] = useState('');
	const [msg, setMsg] = useState('');
	const [loginAlert, setLoginAlert] = useState(false);
	const [loginStatus, setLoginStatus] = useState('');


	const handleInputChange= (e, type) => {
		switch(type){
			case "email":
				setError("");
				setEmail(e.target.value);
				if(e.target.value === ""){
					setError("Usuário está em branco")
				}
				break;
				case "senha":
				setError("");
				setSenha(e.target.value);
				if(e.target.value === ""){
					setError("Senha está em branco");
				}
				break;
				default:
	}
}

	const loginSubmit = async () => {

		setLoginAlert(false);
		setLoginStatus('');

		if(email !== "" && senha != ""){
			var url = "http://localhost/api_p2/login.php";
			var headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			};
			var Data = {
				email: email,
				senha: senha
			};
			await fetch(url, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(Data)
			}).then((res) => res.json())
			.then((resJson) => {

				if(resJson.success){

					const dataExpiracao = new Date();
					dataExpiracao.setTime(dataExpiracao.getTime() + (30 * 60 * 1000));
					const expira = "expires=" + dataExpiracao.toUTCString();
					document.cookie = `name=${resJson.usuario.nome} ${resJson.usuario.sobrenome}; ${expira}; path=/`;
					document.cookie = `permission=${resJson.usuario.permissao}	; ${expira}; path=/`;
					document.cookie = `id=${resJson.usuario.id}	; ${expira}; path=/`;
					
					setLoginAlert(true);
					setLoginStatus("success")

					setTimeout(() => {
						navigate('/home')
					}, 3000);

				} else {

					setLoginAlert(true);
					setLoginStatus("error")
				}

			})
			
			.catch((err) => {
				setError(err);
				console.error(err);
			})

		}else{
			setError("Todos os campos são obrigatórios.")
		}
	}

	useEffect(() => {
		if(verificaLogin()){
			navigate("/home")
		}
	}, [])

    return (
        <>
		<div className="container">
			<h1>Faça seu Login</h1>
			<h5>Configure seu cartão digital</h5>

					<div className="login-alert" style={{ display: loginAlert ? 'block' : 'none',  backgroundColor: loginStatus == 'error' ? '#f0d3d3' : '#b8d9ba'}}>
						<p>{ loginStatus == 'error' ? 'Houve uma falha no login, por favor verique seus dados.' : 'Login realizado com sucesso. Você será redirecionado em alguns segundos.' }</p>
					</div>
					<div className="login">
						<label htmlFor="email">Digite seu e-mail</label>
						<input
							placeholder='E-mail'
							name='email'
							autoComplete='username'
							id='email'
							onChange={(e) => handleInputChange(e, "email")} 
							value={email}
						/>
						<p></p>
						<label htmlFor="password">Digite sua senha</label>
						<input
							type='password'
							name='password'
							placeholder='*********'
							autoComplete='current-password'
							id='senha'
							onChange={(e) => handleInputChange(e, "senha")}  
							value={senha}
						/>
						<p></p>

						{
							error !== "" ?
							<span className="error">{error}</span> :
							<span className="sucess">{error}</span> 

						}
					
						<button
							type='submit'

							onClick={loginSubmit}
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