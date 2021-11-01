export default class UserPrincipal {

    constructor(firebaseUser) {
        this.firebaseUser = firebaseUser;
    }

    get email() {
        return this.firebaseUser.email;
    }

    get displayName() {
        return this.firebaseUser.displayName;
    }

    get photoURL() {
        return this.firebaseUser.photoURL;
    }
}