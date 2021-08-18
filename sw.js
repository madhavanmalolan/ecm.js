self.addEventListener('push', function(e) {
    var options = {
      body: e.data.json().data,
    };
    e.waitUntil(
      self.registration.showNotification(`ECM: ${e.data.json().title}`, options)
    );
  });
  