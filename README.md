# Ethereum Cloud Messaging Network
Decentralized network for sending browser push notification to user's Ethereum addresses

## Subscribe to Notifications from Ethereum
_Currently only on ROPSTEN_

Upon subscription
- Developers will be able to send a push notification to your Ethereum Address
- You will receive a push notification pop up on your browser
- Developers will have to pay to send you a notification, you'll earn a part of it

[Subscribe to Ethereum Notifications](https://madhavanmalolan.github.io/ecm.js/)

## Join the ECM Network and start earning
ECM network works better when more developers integrate ECM on their websites. By adding ECM to your website, you are connecting the service worker on your website to the ECM network. Other developers can pay to notify users through your website's service worker.

To add support : 
### 1. Add the library to your website
```  
<script src="https://madhavanmalolan.github.io/ecm.js/ecm.js"></script>
  <script>
  async function register(){
    if(!window.ethereum){
        alert("You must install metamask to connect to ECM");
        window.location.href = "https://metamask.io";
    }
    await window.ethereum.enable();
    const ecm = new ECM();
    ecm.register("0x0D5138BC001aFaEf7Fc679DE66463E3108dc7C26", true);  
  }
  async function init(){
    const ecm = await new ECM();
    if(await ecm.isRegistered()){
        document.getElementById('ecm_connect_button').setAttribute("src", "https://madhavanmalolan.github.io/ecm.js/ecm_connected.png");
    }
  }
  init();
  </script>
  <a href="https://madhavanmalolan.github.io/ecm.js"><img src="https://madhavanmalolan.github.io/ecm.js/ecm_notconnected.png" id="ecm_connect_button" style="position: fixed; height: 64; bottom:12; left: 12;"/></a>

```

### 2. Create a service worker 
A service worked called `sw.js` in the root directory of your project such that is is accessible from `./sw.js`
```
  // sw.js
  self.addEventListener('push', function(e) {
    var options = {
      body: e.data.json().data,
    };
    e.waitUntil(
      self.registration.showNotification(`ECM: ${e.data.json().title}`, options)
    );
  });            
```

### 3. Change default ecm registration
You can have your visitors use any ECM node.
Replace the server address in the call : 
```
ecm.register('ENTER ETH ADDRESS HERE');
```

You can create and register your own ECM node using the [ECM Node repository](https://github.com/madhavanmalolan/ecm)

Here are a list of verified node addresses : 
```
0x0D5138BC001aFaEf7Fc679DE66463E3108dc7C26
```


