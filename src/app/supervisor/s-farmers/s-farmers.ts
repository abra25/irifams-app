import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


interface Farmer {

  id?: number;

  employeeNo?: string;

  username?: string;

  fullName: string;

  email?: string;

  phone: string;

  gender?: string;

  blockName?: string;

  role: string;

  enabled?: boolean;

}


@Component({

  selector: 'app-s-farmers',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './s-farmers.html',

  styleUrl: './s-farmers.css'

})


export class SFarmers
  implements OnInit {


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(

    private userService: UserService,

    private authService: AuthService,

    private cdr: ChangeDetectorRef

  ) {}


  // =========================================================
  // UI
  // =========================================================

  searchTerm = '';

  showAddModal = false;

  showViewModal = false;

  showEditModal = false;


  // =========================================================
  // DATA
  // =========================================================

  selectedFarmer!: Farmer;

  farmers: Farmer[] = [];


  // =========================================================
  // CURRENT SUPERVISOR BLOCK
  // =========================================================

  currentSupervisorBlock = '';


  // =========================================================
  // NEW FARMER
  // =========================================================

  newFarmer: Farmer = {

    employeeNo: '',

    username: '',

    fullName: '',

    email: '',

    phone: '',

    blockName: '',

    gender: '',

    role: 'FARMER'

  };


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.loadSupervisorBlock();

    this.loadFarmers();

  }


  // =========================================================
  // GET CURRENT SUPERVISOR BLOCK
  // =========================================================

  private loadSupervisorBlock(): void {

    const user =
      this.authService.getUser();


    if (user) {

      this.currentSupervisorBlock =
        user.blockName || '';

    }


    /*
     * Always keep the new farmer's block
     * equal to the logged-in supervisor's block.
     */

    this.newFarmer.blockName =
      this.currentSupervisorBlock;

  }


  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  openAddModal(): void {

    /*
     * Refresh the supervisor block from
     * the currently logged-in user.
     */

    this.loadSupervisorBlock();


    /*
     * Reset the form while preserving
     * the supervisor's block.
     */

    this.newFarmer = {

      employeeNo: '',

      username: '',

      fullName: '',

      email: '',

      phone: '',

      blockName:
        this.currentSupervisorBlock,

      gender: '',

      role: 'FARMER'

    };


    this.showAddModal = true;

  }


  // =========================================================
  // LOAD FARMERS
  // =========================================================

  loadFarmers(): void {

    this.userService
      .getMyFarmers()
      .subscribe({

        next: (res) => {

          this.farmers = [
            ...res
          ];


          this.cdr.detectChanges();

        },


        error: () => {

          Swal.fire(

            'Error',

            'Failed to load farmers',

            'error'

          );

        }

      });

  }


  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  get filteredFarmers(): Farmer[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    return this.farmers.filter(
      farmer => {

        return (

          (farmer.fullName || '')
            .toLowerCase()
            .includes(search)

          ||

          (farmer.phone || '')
            .toLowerCase()
            .includes(search)

          ||

          (farmer.employeeNo || '')
            .toLowerCase()
            .includes(search)

          ||

          (farmer.username || '')
            .toLowerCase()
            .includes(search)

          ||

          (farmer.email || '')
            .toLowerCase()
            .includes(search)

        );

      }
    );

  }


  // =========================================================
  // ADD FARMER
  // =========================================================

  addFarmer(): void {


    // -------------------------------------------------------
    // REFRESH CURRENT SUPERVISOR BLOCK
    // -------------------------------------------------------

    this.loadSupervisorBlock();


    // -------------------------------------------------------
    // BASIC VALIDATION
    // -------------------------------------------------------

    if (

      !this.newFarmer.employeeNo ||

      !this.newFarmer.fullName ||

      !this.newFarmer.username ||

      !this.newFarmer.email ||

      !this.newFarmer.phone ||

      !this.newFarmer.gender

    ) {

      Swal.fire(

        'Missing Information',

        'Please fill in all required farmer details.',

        'warning'

      );

      return;

    }


    // -------------------------------------------------------
    // FARMER PAYLOAD
    // -------------------------------------------------------

    const payload = {

      username:
        this.newFarmer.username,

      password:
        '123456',

      employeeNo:
        this.newFarmer.employeeNo,

      fullName:
        this.newFarmer.fullName,

      email:
        this.newFarmer.email,

      phone:
        this.newFarmer.phone,

      gender:
        this.newFarmer.gender,

      blockName:
        this.currentSupervisorBlock,

      role:
        'FARMER'

    };


    // -------------------------------------------------------
    // CREATE FARMER
    // -------------------------------------------------------

    this.userService
      .addUser(payload)

      .subscribe({

        next: () => {

          Swal.fire(

            'Success',

            'Farmer registered successfully\nDefault Password: 123456',

            'success'

          );


          // -------------------------------------------------
          // CLOSE MODAL
          // -------------------------------------------------

          this.showAddModal =
            false;


          // -------------------------------------------------
          // RESET FORM
          // -------------------------------------------------

          this.newFarmer = {

            employeeNo: '',

            username: '',

            fullName: '',

            email: '',

            phone: '',

            blockName:
              this.currentSupervisorBlock,

            gender: '',

            role: 'FARMER'

          };


          // -------------------------------------------------
          // RELOAD FARMERS
          // -------------------------------------------------

          this.loadFarmers();

        },


        error: (err) => {

          let message =
            'Registration failed';


          if (
            typeof err?.error === 'string'
          ) {

            message =
              err.error;

          } else if (
            err?.error?.message
          ) {

            message =
              err.error.message;

          }


          Swal.fire(

            'Error',

            message,

            'error'

          );

        }

      });

  }


  // =========================================================
  // VIEW FARMER
  // =========================================================

  viewFarmer(farmer: Farmer): void {

    this.selectedFarmer =
      farmer;

    this.showViewModal =
      true;

  }


  // =========================================================
  // EDIT FARMER
  // =========================================================

  editFarmer(farmer: Farmer): void {

    this.selectedFarmer = {

      ...farmer

    };


    /*
     * Do not allow the supervisor to
     * move the farmer to another block.
     */

    this.selectedFarmer.blockName =
      this.currentSupervisorBlock;


    this.showEditModal =
      true;

  }


  // =========================================================
  // SAVE EDIT
  // =========================================================

  saveEdit(): void {


    /*
     * Always force the current supervisor's
     * block before sending the update.
     */

    this.selectedFarmer.blockName =
      this.currentSupervisorBlock;


    this.userService

      .updateUser(

        this.selectedFarmer.id!,

        this.selectedFarmer

      )

      .subscribe({

        next: () => {

          Swal.fire(

            'Success',

            'Farmer updated successfully',

            'success'

          );


          this.showEditModal =
            false;


          this.loadFarmers();

        },


        error: (err) => {

          let message =
            'Failed to update farmer';


          if (
            typeof err?.error === 'string'
          ) {

            message =
              err.error;

          } else if (
            err?.error?.message
          ) {

            message =
              err.error.message;

          }


          Swal.fire(

            'Error',

            message,

            'error'

          );

        }

      });

  }


  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  toggleStatus(
    farmer: Farmer
  ): void {

    this.userService

      .toggleStatus(
        farmer.id!
      )

      .subscribe({

        next: () => {

          this.loadFarmers();

        },

        error: () => {

          Swal.fire(

            'Error',

            'Failed to update farmer status',

            'error'

          );

        }

      });

  }


  // =========================================================
  // ACTIVE FARMERS COUNT
  // =========================================================

  get activeFarmersCount(): number {

    return this.farmers.filter(

      farmer =>
        farmer.enabled

    ).length;

  }

}