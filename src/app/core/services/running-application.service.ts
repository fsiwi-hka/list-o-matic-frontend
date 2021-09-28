import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunningApplicationService {

  applications: any = {};

  constructor() {
    this.loadApplications();
  }

  loadApplications(): void {
    const sessApplications = sessionStorage.getItem('my_applications');
    if (sessApplications !== null) {
      this.applications = JSON.parse(sessApplications);
    }
  }

  saveApplications(): void {
    sessionStorage.setItem('my_applications', JSON.stringify(this.applications));
  }

  newApplication(listUuid: string, applicationUuid: string): void {
    this.applications[listUuid] = applicationUuid;
    this.saveApplications();
  }

  deleteApplication(listUuid: string, applicationUuid: string): void {
    if (this.isOwnApplication(listUuid, applicationUuid)) {
      this.applications[listUuid] = null;
      this.saveApplications();
    }
  }

  hasApplicationActive(listUuid: string): boolean {
    if (this.applications[listUuid]) {
      return true;
    }

    return false;
  }

  isOwnApplication(listUuid: string, applicationUuid: string): boolean {
    if (this.hasApplicationActive(listUuid)) {
      if (this.applications[listUuid] === applicationUuid) {
        return true;
      }
    }

    return false;
  }

  getCurrentApplication(listUuid: string): string | null {
    return this.applications[listUuid];
  }

}
