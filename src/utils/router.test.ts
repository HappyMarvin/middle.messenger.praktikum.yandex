import { expect } from "chai";
import Block from "./block";
import { Router } from "./router";
describe('Route', () => {

    const router = new Router('#app');

    class SignUpForm extends Block {}
    class LoginForm extends Block {}
    class ProfileForm extends Block {}

    router.use('/sign-up/', SignUpForm);
    router.use('/sign-in/', LoginForm);
    router.use('/profile/', ProfileForm);
    router.start();
    

    it('Change route history', () => {
        window.history.pushState({page: 'sign-up'}, 'sign-up', '/sign-up');
        window.history.pushState({page: 'sign-in'}, 'sign-in', '/sign-in');
    
        expect(window.history.length).to.eq(3);
    });

    it('Get pathname', () => {
        router.go('/profile/');
        const pathname = router.getCurrentRoute() || '';
        expect(pathname).to.eq('/profile/');
      });
    
}); 
