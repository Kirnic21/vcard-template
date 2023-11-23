import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";


const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [error, setError] = useState('');
	const [msg, setMsg] = useState('');


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

	const loginSubmit = () => {
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
			fetch(url, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(Data)
			}).then((res) => res.json())
			.then((resJson) => {
				setMsg(resJson.result);
				navigate('/home')
			}).catch((err) => {
				setError(err);
				console.log(err);
			})
		}else{
			setError("Todos os campos são obrigatórios.")
		}
	}

	useEffect(() => {
		setTimeout(function(){
			setMsg("");
		}, 5000);
	},[msg]);

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