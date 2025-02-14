import { Component, ElementRef, ViewChildren, ViewChild} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;
  @ViewChild('nombre_', { read: ElementRef }) nombre_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('apellido_', { read: ElementRef }) apellido_: ElementRef<HTMLIonInputElement> | undefined;

  
  private animation: Animation | undefined;
  private animation_nombre: Animation | undefined;

  segment = "misDatos";
  
  user = {usuario: '', password: ''};
  nombre = "";
  apellido = "";
  nivel_educacional = "";
  fecha_nacimiento = "";
  location: any;
  alertButtons = ['Ok'];

  constructor(private activeroute: ActivatedRoute, private router:Router,private animationCtrl: AnimationController) {
    this.location = location;
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()!.extras.state){
        //console.log(this.router.getCurrentNavigation()!.extras.state!['user']);
        this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
      }
    });
  }

  ngAfterViewInit() {
    if (this.titulo) {
      this.animation = this.animationCtrl
        .create()
        .addElement(this.titulo.nativeElement)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translate(-50%)', opacity: '0.2' },
          { offset: 0.5, transform: 'translate(0%)', opacity: '1' },
          { offset: 1,  transform: 'translate(50%)', opacity: '0.2' },
        ]);
        
      this.animation.play();
    }
  }

  

  limpiar(){
    //this.location.reload();
    this.nombre = "";
    this.apellido = "";
    this.nivel_educacional = "";
    this.fecha_nacimiento = "";

    if(this.nombre_ && this.apellido_){
      this.animation_nombre =  this.animationCtrl.create()
      .addElement(this.nombre_.nativeElement)
      .addElement(this.apellido_.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translate(0%)'},
        { offset: 0.3,  transform: 'translate(1%)'},
        { offset: 0.6, transform: 'translate(-1%)'},
        { offset: 1,  transform: 'translate(0%)'},
      ]);
      this.animation_nombre.play();
    }
  }

  onChangeSegment(event: any){
    this.segment = event.detail.value;
  }

}
