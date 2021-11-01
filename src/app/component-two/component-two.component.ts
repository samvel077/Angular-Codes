import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsoleService } from "@services/console.service";

@Component({
  selector: "app-component-two",
  templateUrl: "./component-two.component.html",
  styleUrls: ["./component-two.component.scss"],
})
export class ComponentTwoComponent implements OnInit {
  data: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private consoleSvc: ConsoleService
  ) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit() {
    this.activatedroute.data.subscribe((data) => {
      this.data = data;
    });

    console.log(this.data);
  }
}
