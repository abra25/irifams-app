import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InputService } from '../../services/input.service';

interface FarmInput{

  id?:number;

  name:string;

  category:string;

  quantity:number;

  unit:string;

  season:string;

  image:string;

  status:string;

}

@Component({
  selector: 'app-admin-inputs',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-inputs.html',
  styleUrl: './admin-inputs.css'
})
export class AdminInputs implements OnInit{

  constructor(
    private inputService:InputService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadInputs();

  }

  searchTerm='';

  showAddModal=false;
  showViewModal=false;
  showEditModal=false;

  selectedInput!:FarmInput;

  inputs:FarmInput[]=[];

  newInput:FarmInput={

    name:'',
    category:'',
    quantity:0,
    unit:'',
    season:'',
    image:'',
    status:'Available'

  };

  loadInputs(){

    this.inputService
        .getAllInputs()

        .subscribe({

          next:(res)=>{

           
            this.inputs = [...res];
            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load inputs',
              'error'
            );

          }

        });

  }

  get filteredInputs(){

    return this.inputs.filter(input=>

      input.name.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      input.category.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

    );

  }

  get availableCount(){

    return this.inputs.filter(
      i=>i.status==='Available'
    ).length;

  }

  addInput(){

    this.inputService
        .addInput(this.newInput)

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Input added successfully',
              'success'
            );

            this.showAddModal=false;

            this.newInput={

              name:'',
              category:'',
              quantity:0,
              unit:'',
              season:'',
              image:'',
              status:'Available'

            };

            this.loadInputs();

          },

          error:(err)=>{

            Swal.fire(
              'Error',
              err.error || 'Failed to save input',
              'error'
            );

          }

        });

  }

  viewInput(input:FarmInput){

    this.selectedInput=input;

    this.showViewModal=true;

  }

  editInput(input:FarmInput){

    this.selectedInput={...input};

    this.showEditModal=true;

  }

  saveInput(){

    this.inputService
        .updateInput(
          this.selectedInput.id!,
          this.selectedInput
        )

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Input updated successfully',
              'success'
            );

            this.showEditModal=false;

            this.loadInputs();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Update failed',
              'error'
            );

          }

        });

  }

  deleteInput(input:FarmInput){

    Swal.fire({

      title:'Delete input?',

      text:'This action cannot be undone',

      icon:'warning',

      showCancelButton:true

    }).then(result=>{

      if(result.isConfirmed){

        this.inputService
            .deleteInput(input.id!)

            .subscribe({

              next:()=>{

                Swal.fire(
                  'Deleted',
                  'Input deleted successfully',
                  'success'
                );

                this.loadInputs();

              }

            });

      }

    });

  }

  toggleStatus(input:FarmInput){

    this.selectedInput={

      ...input,

      status:

      input.status==='Available'
      ? 'Out of Stock'
      : 'Available'

    };

    this.saveInput();

  }

}