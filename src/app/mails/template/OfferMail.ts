interface IOptions {
    email: string;
    url: string;
}

export function OfferMailHTML(data: IOptions) {
    return `
        <style>
            body {
                margin: 0;
                height: 100vh;
                font-family: system-ui;
            }
          
            .main {
                background: #EA2027;
                padding: 50px;
            }
          
            .realese {
                background: white;
                border-radius: 10px;
                padding: 20px;
            }
          
            img {
                width: 150px;
            }
          
            .banner {
                text-align: center;
            }
          
            .content h1 {
                padding: 0px;
                margin: 0px;
            }          
        </style>

        <body class="main">
            <div class="realese">
                <section class="banner">
                    <img src="https://res.cloudinary.com/dlkfpx8lb/image/upload/v1613101428/angular_1_ucmazl.png" alt="">
                </section>
                <section class="content">
                    <h1>Hola ${ data.email }</h1>
                    <p>Gracias por registrar tu cuenta en <span>Team Angular 15</span> Antes de embacarte en este maravilloso mundo es necesario que confirme tu cuenta. Para ello es necesario que presiones el boton de abajo, y estara todo listo.</p>
                    <a href="${ data.url }">
                        <button>Verificar email</button>
                    </a>
                </section>
            </div>
        </body>
    `;
};
