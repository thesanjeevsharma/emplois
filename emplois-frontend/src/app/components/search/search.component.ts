import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  jobs: Object[];

  constructor(private router : Router, private currRoute : ActivatedRoute, private flash : FlashMessagesService, private data : DataService) { }

  ngOnInit() {
    this.query = this.currRoute.snapshot.params['query'];
    this.data.search(this.query).subscribe((res) => {
      if(res['success']) {
        this.jobs = res['data'];
      }
      else {
        this.flash.show(res['message'], { cssClass : 'alert-danger', timeout : 3000 });
      }
    })
  }

  openJob(id) {
    if(id) {
      this.router.navigate(['/jobs/' + id ]);
    }
  }

}
