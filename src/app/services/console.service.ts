import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ConsoleService {
  constructor() {}

  samo() {
    console.log("samo");
  }
}
