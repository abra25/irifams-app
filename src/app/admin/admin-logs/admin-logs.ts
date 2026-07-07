import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import { AuditLogService }
from '../../services/audit-log.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-logs',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-logs.html',
  styleUrl: './admin-logs.css'
})
export class AdminLogs
implements OnInit {
  

  constructor(

    private logService:AuditLogService,
    private cdr: ChangeDetectorRef

  ){}

  logs:any[] = [];

  ngOnInit(): void {

    this.loadLogs();

  }
  
  searchTerm='';

selectedTab='All';

get filteredLogs(){

  return this.logs.filter(log=>{

    const statusMatch=

      this.selectedTab==='All'

      ||

      log.status===this.selectedTab;

    const searchMatch=

      log.username?.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      log.action?.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      log.module?.toLowerCase()
      .includes(this.searchTerm.toLowerCase());

    return statusMatch && searchMatch;

  });

}
  

  loadLogs(){

    this.logService

        .getLogs()

        .subscribe({

          next:(res)=>{

            this.logs = [...res];
            
            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load activity logs',
              'error'
            );

          }

        });

  }

}