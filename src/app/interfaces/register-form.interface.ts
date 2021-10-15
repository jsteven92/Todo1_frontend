

export interface RegisterForm {
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    lastPasswordResetDate: String,
    enabled: boolean,
    authorities: [
        {
            id: number
        }
    ]
}
