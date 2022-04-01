import { createRouter, createWebHashHistory } from 'vue-router';
import ChatView from './ChatView.vue';
import LoginView from './LoginView.vue';

const routes = [
    { path: '/', component: LoginView },
    { path: '/chat', component: ChatView }
];


export default createRouter({
    history: createWebHashHistory(),
    routes,
});