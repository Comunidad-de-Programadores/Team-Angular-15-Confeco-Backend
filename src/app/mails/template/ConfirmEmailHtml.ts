export function confirmEmailHtml(data: any) {
    return `
        <html>
            <h1>Bienvenido ${ data.nickname }</h1>
            <br>
            <a href="${ data.url }">
                <button>Verificar mail</button>
            </a>
        </html>
    `;
};
