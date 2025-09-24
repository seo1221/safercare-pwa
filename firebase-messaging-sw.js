importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCRkR_G3dOPNMmLG7KWgl2zJNshy5p3YZs",
  authDomain: "alarmtest-13e42.firebaseapp.com",
  projectId: "alarmtest-13e42",
  storageBucket: "alarmtest-13e42.firebasestorage.app",
  messagingSenderId: "685591126765",
  appId: "1:685591126765:web:ae166348fbc661439062e4",
});

const messaging = firebase.messaging();

// 브라우저가 이미 자동으로 배너를 띄움 → SW에서는 또 띄우지 않음
messaging.onBackgroundMessage((payload) => {
  if (payload.notification) return;

  // data-only 메시지용(서버가 notification 없이 data만 보낼 때)
  const title = (payload.data && payload.data.title) || 'Alert';
  const options = {
    body: (payload.data && payload.data.body) || '',
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification && event.notification.data && event.notification.data.url) || './';
  event.waitUntil(clients.openWindow(url));
});
