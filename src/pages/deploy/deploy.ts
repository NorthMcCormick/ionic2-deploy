import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';  

/*
  Generated class for the Deploy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-deploy',
  templateUrl: 'deploy.html'
})
export class DeployPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public deploy: Deploy) {

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeployPage');

    this.deploy.check().then((snapshotAvailable: boolean) => {
			if (snapshotAvailable) {
				console.log('There\'s an update!');
				this.deploy.download().then(() => {
					return this.deploy.extract().then(() => {
						this.deploy.load();
					});
				});
			}else{
				console.log('No new code :(');
			}
		});	
  }

}
