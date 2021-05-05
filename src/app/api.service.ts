import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public listGet(uuid?: string) {
    if (uuid) {
      return this.getCall('/list/' + uuid);
    } else {
      return this.getCall('/list');
    }
  }

  public listPost(name: string) {
    return this.postCall('/list', JSON.stringify({
      name
    }), 'application/json');
  }

  public listDelete(uuid: string) {
    return this.deleteCall('/list/' + uuid);
  }

  public groupGet(listUuid: string, groupUuid?: string) {
    if (groupUuid) {
      return this.getCall('/list/' + listUuid + '/group/' + groupUuid);
    } else {
      return this.getCall('/list/' + listUuid + '/group');
    }
  }

  public groupPost(listUuid: string, name: string) {
    return this.postCall('/list/' + listUuid + '/group', JSON.stringify({
      name
    }), 'application/json');
  }

  public groupDelete(listUuid: string, groupUuid: string) {
    return this.deleteCall('/list/' + listUuid + '/group/' + groupUuid);
  }

  public applicationGet(listUuid: string, groupUuid: string) {
    return this.getCall('/list/' + listUuid + '/group/' + groupUuid + '/application');
  }

  public applicationPost(listUuid: string, groupUuid: string, name: string) {
    return this.postCall('/list/' + listUuid + '/group/' + groupUuid + '/application', JSON.stringify({
      name
    }), 'application/json');
  }

  public applicationDelete(listUuid: string, groupUuid: string, applicationUuid: string) {
    return this.deleteCall('/list/' + listUuid + '/group/' + groupUuid + '/application/' + applicationUuid);
  }

  public startContribution(listUuid: string, groupUuid: string, applicationUuid: string) {
    return this.getCall('/list/' + listUuid + '/start_contribution?group=' + groupUuid + '&application=' + applicationUuid);
  }

  public stopContribution(listUuid: string) {
    return this.getCall('/list/' + listUuid + '/stop_contribution');
  }

  public timeDistribution(listUuid: string) {
    return this.getCall('/list/' + listUuid + '/time_distribution');
  }

  public resetPastContributions(listUuid: string) {
    return this.getCall('/list/' + listUuid + '/reset_past_contributions');
  }

  private getCall(url: string) {
    return new Observable((subscriber) => {
      this.http.get(encodeURI(environment.apiUrl + url), {
      }).subscribe({
        next: data => subscriber.next(data),
        error: err => subscriber.error(err)
      });
    });
  }

  private deleteCall(url: string) {
    return new Observable((subscriber) => {
      this.http.delete(encodeURI(environment.apiUrl + url), {
      }).subscribe({
        next: data => subscriber.next(data),
        error: err => subscriber.error(err)
      });
    });
  }

  private postCall(url: string, data: any, contentType: string) {
    return new Observable((subscriber) => {
      this.http.post(encodeURI(environment.apiUrl + url), data, {
        headers: new HttpHeaders({
          'Content-Type': contentType
        })
      }).subscribe({
        next: data => subscriber.next(data),
        error: err => subscriber.error(err)
      });
    });
  }
}
