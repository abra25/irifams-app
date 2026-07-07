import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputService } from '../../services/input.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-inputs',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './s-inputs.html',
  styleUrl: './s-inputs.css',
})
export class SInputs implements OnInit {

constructor(

  private inputService: InputService,
  private userService: UserService,
  private cdr: ChangeDetectorRef

){}

  ngOnInit(): void {

  this.loadInputs();

  this.loadFarmers();

}

inputs:any[]=[];

farmers:any[]=[];

selectedInput:any;

showViewModal=false;
showDistributionModal=false;

selectedFarmerId!:number;

distributionQuantity=0;


  newInput = {
    name: '',
    category: '',
    image: '',
    quantity: 0,
    unit: '',
    season: ''
  };


  loadInputs(){

  this.inputService

      .getAllInputs()

      .subscribe({

        next:(res)=>{

          this.inputs = [...res];

          this.cdr.detectChanges();

        }

      });

}


loadFarmers(){

  this.userService

      .getMyFarmers()

      .subscribe({

        next:(res)=>{

          this.farmers=[...res];

        }

      });

}
  

  saveDistribution(){

  this.inputService

      .distributeInput(

        this.selectedInput.id,

        this.selectedFarmerId,

        this.distributionQuantity

      )

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'Input distributed successfully',
            'success'
          );

          this.showDistributionModal = false;

          this.loadInputs();

        },

        error:(err)=>{

  console.log(err);

  Swal.fire({

    icon:'error',

    title:'Error',

    text:

      typeof err.error === 'string'

      ? err.error

      : err.error?.message ||

        'Failed to distribute input'

  });

}

      });

}

 viewInput(input:any){

  this.selectedInput = input;

  this.showViewModal = true;

}

  distributeInput(input:any){

  this.selectedInput = input;

  this.distributionQuantity = 0;

  this.selectedFarmerId = 0;

  this.showDistributionModal = true;

}

  get availableCount(): number {

    return this.inputs.filter(
      i => i.status === 'Available'
    ).length;

  }

}