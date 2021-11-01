export default class LoginError extends Error {
    constructor(cause) {
        super(cause.message)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, LoginError)
        }
      
        this.name = 'LoginError'
        this.cause = cause;
    }

    static ERR_BAD_CREDENTIALS = "ERR_BAD_CREDENTIALS";
    static ERR_USER_DISABLED = "ERR_USER_DISABLED";
    static ERR_OTHER = "ERR_OTHER";

    get code() {
        if (!this.cause || this.cause.name !== "FirebaseError" || !this.cause.code) {
            return LoginError.ERR_OTHER;
        }
        switch (this.cause.code) {
            case "auth/user-disabled":
            case "auth/too-many-requests": // "Access to this account has been temporarily disabled due to many failed login attempts. ..."
                return LoginError.ERR_USER_DISABLED;
            case "auth/user-not-found":
            case "auth/wrong-password":
                return LoginError.ERR_BAD_CREDENTIALS;
        }
        return LoginError.ERR_OTHER;
    }
}