function setCookie(name, token, expirationTime) {
    return ([
        name,
        token,
        {
            httpOnly: true,
            expires: new Date(new Date().setDate(new Date().getDate() + expirationTime)),
            secure: false
        }
    ])
}

module.exports = setCookie