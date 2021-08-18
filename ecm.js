class ECM {
    w3 = null;
    contract = null;
    signer = null;
    serviceWorker = "./sw.js";
    constructor(serviceWorker="./sw.js") {
        this.serviceWorker = serviceWorker;
        navigator.serviceWorker.register(serviceWorker).then(function(registration) {
            console.log('Service worker registration succeeded:', registration);
          }, /*catch*/ function(error) {
            console.log('Service worker registration failed:', error);
          });
        
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // The Metamask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        this.signer = provider.getSigner();
        this.contract = new ethers.Contract("0x2efF4A6d1C101D0C4c33e13FC21De523bAfDA5b3", 
        [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "encryptedPushToken",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "data",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "image",
                        "type": "string"
                    }
                ],
                "name": "NewNotification",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "NewServer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    }
                ],
                "name": "getServerPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    }
                ],
                "name": "getServerPublicKey",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    }
                ],
                "name": "getServerVapidKey",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserRegistrationServer",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "isUserRegistered",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "publicKey",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "vapidKey",
                        "type": "string"
                    }
                ],
                "name": "registerServer",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "server",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "encryptedPushToken",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "metadata",
                        "type": "string"
                    }
                ],
                "name": "registerUser",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "data",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "image",
                        "type": "string"
                    }
                ],
                "name": "sendNotification",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ]
        , provider);


   }

    async isRegistered() {
        return await this.contract.isUserRegistered(await this.signer.getAddress());
    }

    async register(server, forceRenew=false) {
        const self = this;
        const status = await Notification.requestPermission();
        console.log(status);
        if(status!=='granted'){
            alert("You need to give notification permissions to subscribe to ECM");
            return;
        }

        if ('serviceWorker' in navigator) {
            // declaring scope manually
            navigator.serviceWorker.register(this.serviceWorker, {scope: '*'}).then(async function(registration) {
                const publicKey = await self.contract.getServerPublicKey(server);
                const vapidKey = await self.contract.getServerVapidKey(server);
                const price = await self.contract.getServerPrice(server);
                const isRegistered = await self.isRegistered();
                console.log(publicKey);
                if(!publicKey){
                    return;
                }
                if(isRegistered && !forceRenew)
                    return;

                console.log("isRegistered", isRegistered);
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidKey
                }).then(
                                function(pushSubscription) {
                                    console.log(pushSubscription.subscriptionId);
                                    console.log(pushSubscription.endpoint, pushSubscription.endpoint.length);
                                    console.log(JSON.stringify(pushSubscription), JSON.stringify(pushSubscription).length);
                                    const encrypt = new JSEncrypt();
                                    encrypt.setPublicKey(publicKey);
                                    const encryptedPushToken = encrypt.encrypt(JSON.stringify(pushSubscription));
                                    console.log(encryptedPushToken);

                                    self.contract.connect(self.signer).registerUser(server, encryptedPushToken, "{}", { value : price });
                                }, function(error) {
                                    console.log(error);
                                }
                            );     

            }, /*catch*/ function(error) {
              console.log('Service worker registration failed:', error);
            });
          } else {
            console.log('Service workers are not supported.');
          }
    }

    async notify(user, title, data, image) {
        const server = await this.contract.getUserRegistrationServer(user);
        const price = await this.contract.getServerPrice(server);
        this.contract.connect(this.signer).sendNotification(user, title, data, image, { value: price });
    }
}