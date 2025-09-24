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

// 백그라운드 표시
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Alert';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

// 알림 클릭 시 열릴 URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification && event.notification.data && event.notification.data.url) || './';
  event.waitUntil(clients.openWindow(url));
});
