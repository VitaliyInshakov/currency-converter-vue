import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import CurrencySelect from '@/pages/CurrencySelect';
import ResultPage from '@/pages/ResultPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/choose-pair',
      name: 'CurrencySelect',
      component: CurrencySelect
    },
    {
      path: '/result',
      name: 'ResultPage',
      component: ResultPage
    }
  ]
});
