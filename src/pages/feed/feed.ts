import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
  //   titulo: "Matheus Domingos",
  //   data: "6 de Agosto de 2020",
  //   descricao: "Comecei a criar o primeiro app...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_publi: "11h atrás"
  }

  public lista_filmes = new Array<any>();
  public nome_usuario: string = "Matheus";
  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }


  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  ionViewDidEnter() {
    this.abreCarregando();
    this.moovieProvider.getLatestMoovies().subscribe(
      data => {

        const response = (data as any);
        const obj_retorno = (response._body);
        this.lista_filmes = data['results'];

        console.log(obj_retorno);
        this.fechaCarregando();
      }, error => {
        console.log(error);
        this.fechaCarregando();
      }

    )
  }

}
