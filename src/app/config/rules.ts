export const rules = {
    required: (data: any) => !!data || "Este campo es requerido.",
    nickname: (data: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{7,15}$/.test(data) || "El nombre de usuario debe contener al menos una mayuscula, una minuscula, un numero y ser mayor a 7 y menor a 15 caracteres.",
    email: (data: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data) || "El email es inválido",
    password: (data: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/.test(data) || "La contraseña debe contener una mayuscula, una minuscula, un numero, un caracter especial y ser mayor a 8 caracteres."
};
