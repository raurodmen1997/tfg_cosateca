import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService, ComunService, ObjetoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styles: [
  ]
})
export class ObjetosComponent implements OnInit {

  public objetos:any[] = [];
  pagina:string = "objetos";
  busquedaIniciada:boolean = false;
  
  form:FormGroup;

  constructor(private objetoService:ObjetoService, 
              public comunService:ComunService, 
              public authService:AuthService, 
              private fb:FormBuilder) {
                this.form = this.fb.group({
                  categoria: new FormControl(''),    
                  accesible: new FormControl(''),  
                });
  }

  ngOnInit(): void {

    if(this.authService.hasRole("ROLE_ADMIN")){

      this.objetoService.getObjetos().subscribe(objetos=>{
        this.objetos = objetos;
      })
      
    }else{

      this.objetoService.getObjetosAccesibles().subscribe(objetos=>{
        this.objetos = objetos;
      });

    }

   
  }

  onSubmit(){
    this.busquedaIniciada = true;
    if(this.authService.hasRole("ROLE_ADMIN")){

      if(this.form.get('categoria')?.value === ""){

        if(this.form.get('accesible')?.value === ""){

          this.objetoService.getObjetos().subscribe(resultado=>{

            console.log(resultado);
            if(resultado === null){
              this.objetos = null!;
            }else{
              this.objetos = resultado;
            }

          });

        }else{

          if(this.form.get('accesible')?.value === "1"){

            this.objetoService.getObjetosAccesibles().subscribe(resultado=>{

              console.log(resultado);
              if(resultado === null){
                this.objetos = null!;
              }else{
                this.objetos = resultado;
              }

            });

          }else{

            this.objetoService.getObjetosInaccesibles().subscribe(resultado=>{

              console.log(resultado);
              if(resultado === null){
                this.objetos = null!;
              }else{
                this.objetos = resultado;
              }

            });

          }
        }

      }else{

        if(this.form.get('accesible')?.value === ""){

          this.objetoService.getObjetosPorCategoriaAdmin(this.form.get('categoria')?.value).subscribe(resultado=>{
            
            console.log(resultado);
            if(resultado === null){
              this.objetos = null!;
            }else{
              this.objetos = resultado;
            }

          });

        }else{

          if(this.form.get('accesible')?.value === "1"){

            this.objetoService.getObjetosPorCategoriaYAccesibilidad(this.form.get('categoria')?.value, true).subscribe(resultado=>{

              console.log(resultado);
              if(resultado === null){
                this.objetos = null!;
              }else{
                this.objetos = resultado;
              }

            });

          }else{

            this.objetoService.getObjetosPorCategoriaYAccesibilidad(this.form.get('categoria')?.value, false).subscribe(resultado=>{

              console.log(resultado);
              if(resultado === null){
                this.objetos = null!;
              }else{
                this.objetos = resultado;
              }

            });

          }
        }
      }

    }else{

      this.objetoService.getObjetosPorCategoriaAccesible(this.form.get('categoria')?.value).subscribe(resultado=>{
        console.log(resultado);
        if(resultado === null){
          this.objetos = null!;
        }else{
          this.objetos = resultado;
        }
        
      });

    }
    
  }


  limpiarForm(){

    this.form.get('categoria')?.setValue("");
    this.form.get('accesible')?.setValue("");

    if(this.authService.hasRole("ROLE_ADMIN")){

      this.objetoService.getObjetos().subscribe(objetos=>{
        this.objetos = objetos;
      })
      
    }else{

      this.objetoService.getObjetosAccesibles().subscribe(objetos=>{
        this.objetos = objetos;
      });

    }
  }

}
