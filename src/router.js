import Home from '@/pages/Home';
import { GAME_MODE } from './constants';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import StreetView from '@/pages/StreetView';
import HistoryPage from '@/pages/HistoryPage';
import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/',
            alias: '/index.html',
            name: 'home',
            component: Home,
        },
        {
            path: '/game/:partyParams',
            name: 'party',
            component: Home,
        },
        {
            path: '/room/:roomName',
            name: 'Room',
            component: Home,
        },
        {
            path: '/history',
            name: 'History',
            component: HistoryPage,
        },
        {
            path: '/street-view/:modeSelected',
            name: 'street-view',
            component: StreetView,
            props: (route) => ({
                multiplayer: false,
                ...route.params,
            }),
            beforeEnter: (to, from, next) => {
                if (
                    to.params.modeSelected === GAME_MODE.CLASSIC ||
                    to.params.modeSelected === GAME_MODE.COUNTRY
                ) {
                    next();
                } else {
                    next('/');
                }
            },
        },
        {
            path: '/street-view/with-friends',
            name: 'with-friends',
            component: StreetView,
            props: (route) => ({
                multiplayer: true,
                ...route.params,
            }),
        },
        {
            path: '/privacy-policy',
            name: 'privacy-policy',
            component: PrivacyPolicy,
        },
    ],
});
