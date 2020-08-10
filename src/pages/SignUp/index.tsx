import React from "react";
import Input from "../../components/Input";
import WrapperContent from "../../components/WrapperContent";
import LogoContainer from "../../components/LogoContainer";
import './styles.scss'

function SignUp() {
    return (
        <div id="page-login">
            <WrapperContent className="page-content-left">
                <LogoContainer/>
                <div className="signup-container">
                    <form className="form-80">
                        <fieldset>
                            <legend>
                                <p>Cadastro</p>
                            </legend>
                            <span>Preencha os dados abaixo para começar.</span>
                            <Input name="name" placeholder="Nome" stacked={true}/>
                            <Input name="surname" placeholder="Sobrenome" stacked={true}/>
                            <Input name="email" placeholder="E-mail" stacked={true}/>
                            <Input name="password" placeholder="Senha" type="password" stacked={true}/>
                            <button className="login-submit" type="submit">Concluir cadastro</button>
                        </fieldset>
                    </form>
                </div>
            </WrapperContent>
        </div>
    )
}

export default SignUp;
