import React from "react";
import Input from "../../components/Input";
import WrapperContent from "../../components/WrapperContent";
import LogoContainer from "../../components/LogoContainer";
import './styles.scss'

function ForgotPassword() {
    return (
        <div id="page-login">
            <WrapperContent className="page-content-left">
                <LogoContainer/>
                <div className="signup-container">
                    <form className="form-80">
                        <fieldset>
                            <legend>
                                <p>Eita, esqueceu
                                    sua senha?</p>
                            </legend>
                            <span>Não esquenta, vamos dar um jeito nisso.</span>
                            <Input name="email" placeholder="E-mail"/>
                            <button className="login-submit" type="submit">Enviar</button>
                        </fieldset>
                    </form>
                </div>
            </WrapperContent>
        </div>
    )
}

export default ForgotPassword;
