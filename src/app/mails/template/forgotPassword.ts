// Imports interfaces.
import { IConfirmEmail } from "../../interfaces/mail.interfaces";

export function forgotPasswordHtml(data: IConfirmEmail) {
    return `
        <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: content-box;
            font-family: system-ui;
            text-decoration: none;
        }

        h1 {
            font-size: 25px;
            text-align: center;
            color: gray;
        }

        p {
            padding: 20px 0px;
            line-height: 25px;
        }

        .content {
            background-color: #EA2027;
        }

        .row {
            display: flex;
            width: 100%;
            min-height: 100vh;
            justify-content: center;
            align-items: center;
        }

        .col {
            width: 90%;
        }

        .card {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0px;
        }

        .text {
            text-align: center;
        }

        .card span {
            font-weight: bold;
            color: gray;
        }

        .img {
            width: 150px;
            height: 150px;
            display: block;
            margin: auto;
        }

        button {
            background-color: #EA2027;
            border-radius: 30px;
            padding: 15px 30px;
            font-size: 16px;
            color: white;
            display: block;
            margin: auto;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 0px;
            outline: none;
            cursor: pointer;
        }

        @media screen and (min-width: 700px) {
            .col {
                width: 50%;
            }
        }

        @media screen and (min-width: 1000px) {
            .col {
                width: 40%;
            }
        }
    </style>

        <body>
            <main class="main">
                <section class="content">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="header">
                                    <img src="https://res.cloudinary.com/dlkfpx8lb/image/upload/v1613101428/angular_1_ucmazl.png" alt="Team angular 15 Logo" class="img">
                                </div>
                                <div class="body">
                                    <h1>
                                        <strong>¿Olvidaste tu contraseña?</strong>
                                    </h1>
                                    <p>¡No te preocupes ${ data.nickname }!, tenemos todo bajo control. Consigamos una nueva contraseña. Pero por favor, no seas tan olvidadizo. 😂</p>
                                    <a href="${ data.url }">
                                        <button>Nueva contraseña</button>
                                    </a>
                                </div>
                            </div>
                            <div class="card">
                                <p class="text">2020 <span>Team Angular 15</span>. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </body>
    `;
};
