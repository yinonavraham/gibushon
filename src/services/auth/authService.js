import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import UserPrincipal from "./userPrincipal"
import LoginError from "./loginError"

export default class AuthService {
    constructor() {
        this.internalAuthService = new InternalAuthService();
    }

    get loggedInPrincipal() {
        let user = this.internalAuthService.auth?.currentUser;
        if (user) {
            return new UserPrincipal(user);
        }
        return null;
    }

    signInWithEmailAndPassword(email, password) {
        let result = signInWithEmailAndPassword(this.internalAuthService.auth, email, password)
        return new Promise((resolve, reject) => {
            result.then((userCred) => {
                let userPrincipal = new UserPrincipal(userCred.user);
                resolve(userPrincipal);
            }).catch((err) => {
                reject(new LoginError(err));
            })
        });
    }

    logout() {
        let result = this.internalAuthService.auth.signOut();
        return new Promise((resolve,reject) => {
            result.then(() => {
                resolve();
            }).catch((err) => {
                console.error("Error while logging out: " + err)
                reject(err);
            });
        });
    }
}

class InternalAuthService {
    get auth() {
        try {
            return getAuth();
        } catch (err) {
            return null;
        }
    }
}