import SelfVue from './SelfVue.js';

new SelfVue({
  el: '#app',
  data: {
    title: 'aaa',
    name: 'bbb',
    um: '123',
  },
  methods: {
    asd() {
      console.log(123);
    },
  },
});

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('success');
      }).catch(() => {
        console.log('false');
      });
  });
}
