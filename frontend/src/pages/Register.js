import './Register.css';

const Register = () => {
    return (
        <div className="home">
            <div className="register-section">
                <h2>REGISTRAR USUARIO</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Usuario:</label>
                        <input type="text" id="user" name="user" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Contraseña:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required/>
                    </div>
                    <button type="submit">REGISTRARSE</button>
                </form>
            </div>
            <div className="profile-section">
                <div className="profile-circle"></div>
            </div>
        </div>
    );
};

export default Register;