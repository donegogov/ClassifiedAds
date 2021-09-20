import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassifiedAdsModalComponent } from 'src/app/modals/classified-ads-modal/classified-ads-modal.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-classified-ads-management',
  templateUrl: './classified-ads-management.component.html',
  styleUrls: ['./classified-ads-management.component.css']
})
export class ClassifiedAdsManagementComponent implements OnInit {
  @Input() usersWithClassifiedAds: any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  photos: any[] = [];

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log('console.log(this.users);');
    console.log(this.usersWithClassifiedAds);

    this.displayedColumns = ['username', 'roles', 'title', 'description', 'phone-number', 'email', 'status', 'approve-or-dissapprove'];
    //this.dataSource = this.usersWithClassifiedAds;

    this.usersWithClassifiedAds.forEach(element => {
      let classifiedAd: any = {};
      element.classifiedAds.forEach(ca => {
        classifiedAd = ca;
        classifiedAd.username = element.username;
        classifiedAd.roles = element.roles;
        this.dataSource.push(classifiedAd);
        console.log(element);
      });
      // classifiedAd = element.classifiedAds;
    });

    console.log('console.log(this.dataSource);');
    console.log(this.dataSource);
  }

  openDialog(classifiedAd: any) {
    console.log(classifiedAd);
    this.photos = classifiedAd.photos;
    const dialogRef = this.dialog.open(ClassifiedAdsModalComponent, {
      data: {
        photos: this.photos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
      console.log(result);

      let approveOrDissapprove: string = '';
      if (result.is_approved_checked) {
        approveOrDissapprove = 'Approved';
      } else if (result.is_dissapproved_checked) {
        approveOrDissapprove = 'DissapprovedByAdmin';
      }

      this.adminService.approveOrDissapproveClassifiedAds(classifiedAd.id, approveOrDissapprove).subscribe(response => {
        console.log('response');
        console.log(response);
        if (response['status_code'] === 200) {
          classifiedAd.status = response['approvedOrDissapproved'];
        }

      })
    });
  }

}
