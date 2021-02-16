// Imports interfaces.
import { IConfirmEmail } from "../../interfaces/mail.interfaces";

export function confirmEmail(data: IConfirmEmail) {
    return  `
    <html>
        <style>
            * {
                margin: 0px;
                padding: 0px;
                font-family: system-ui;
                text-decoration: none;
            }
        
            .container {
                padding: 20px 0px;
                background: #CB356B;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #BD3F32, #CB356B);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #BD3F32, #CB356B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
        
            .row {
                display: flex;
                min-height: 100vh;
                align-items: center;
                justify-content: center;
            }
        
            .col {
                width: 90%;
            }
        
            .card {
                background-color: white;
                border-radius: 10px;
                padding: 15px;
            }
        
            .card-header,
            .care-body {
                padding: 20px 10px;
                text-align: center;
            }
        
            h1 {
                font-weight: 100;
            }
        
            .card h1, .card p {
                padding: 10px;
            }
        
            button, p {
                font-size: 18px;
            }
            
            .text-muted {
                color: dimgray;
            }
            
            .text-pink {
                color: #c73859;
            }
        
            .text-center {
                text-align: center;
            }
            
            .img {
                width: 150px;
                height: 150px;
                display: block;
                margin: auto;
            }
            
            .btn {
                padding: 15px 25px;
                margin: 10px auto;
                display: block;
                border: 0;
                outline: none;
                cursor: pointer;
                color: white;
                background-color: #fe7e8a;
                border-radius: 5px;
                transition: .3s all;
            }
        
            .btn:hover {
                background-color: #fd4485;
            }
            
            @media screen and (min-width: 800px) {
                .col {
                width: 70%;
                }
            }
            
            @media screen and (min-width: 1000px) {
                .col {
                width: 50%;
                }
            }
        </style>

        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <img class="img" src="https://res.cloudinary.com/dlkfpx8lb/image/upload/v1613430744/send-confirmation-email_ze6qq2.png">
                        </div>
                        <div class="card-body">
                            <h1 class="text-center">¡${ data.nickname } confirma tu email!</h1>
                            <p class="text-center text-muted">
                                <strong>Team Angular 15</strong> te da la bienvenida. 
                                Para poder validar tu cuenta y la direccion de correo electronico ${ data.email }, es necesario que presiones
                                el boton de abajo, y estara todo listo.
                            </p>
                            <a href="${ data.url }" target="_blank">
                                <button class="btn">Confirmar email</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </html>
    `;
}
