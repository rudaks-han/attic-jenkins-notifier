class FirebaseApp
{
	constructor(props) {
		this.firebase = null;
	}

	init()
	{
		const config = {
			apiKey: "AIzaSyC2k2FYX593WgCF9aDzJPoYOwXHUBgH_d0",
			authDomain: "jenkins-build-checker.firebaseapp.com",
			databaseURL: "https://jenkins-build-checker.firebaseio.com",
			projectId: "jenkins-build-checker",
			storageBucket: "jenkins-build-checker.appspot.com",
			messagingSenderId: "608061993493",
			appId: "1:608061993493:web:aa5dbe54782b73bdf8d41c"
		};
		this.firebase = firebase.initializeApp(config);
	}

	set(key, value)
	{
		this.firebase.database().ref(key).set({
			value
		});
	}

	get(key, callback)
	{
		var ref = this.firebase.database().ref(key);
		ref.on('value', function(snapshot) {
			callback(snapshot);
		});
	}
}

const firebaseApp = new FirebaseApp();
firebaseApp.init();
