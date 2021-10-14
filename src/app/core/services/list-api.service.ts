import { Injectable } from '@angular/core';
import { CommonApiService } from './common-api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {

  constructor(
    private commonApi: CommonApiService,
    private userService: UserService
  ) {
  }

  /**
   * Retrieve a single talking list or all talking lists known to the backend.
   *
   * If the currently logged in user is an administrator, retrieve the full list of talking lists
   *
   * @param uuid If just a single list shall be obtained, provide the list UUID.
   * @returns A HTTP request (Observable)
   */
  public listGet(uuid?: string) {
    let prefix = 'public';
    if (this.userService.currentUserIsAdmin()) {
      prefix = 'protected'
    }

    if (uuid) {
      return this.commonApi.getRequest(`/${prefix}/list/${uuid}`);
    }
    return this.commonApi.getRequest(`/${prefix}/list`);
  }

  /**
   * Create a new talking list.
   *
   * @param name Name of the talking list to be created
   * @returns A HTTP request (Observable)
   */
  public listPost(name: string) {
    return this.commonApi.postJSONRequest('/protected/list', {
      name
    });
  }

  /**
   * Delete a talking list.
   *
   * @param uuid UUID of the talking list to delete
   * @returns A HTTP request (Observable)
   */
  public listDelete(uuid: string) {
    return this.commonApi.deleteRequest(`/protected/list/${uuid}`);
  }

  /**
   * Update the visibility of a talking list.
   *
   * @param uuid UUID of the talking list to modify
   * @param newVisibility The new visibility of this talking list (0-2)
   * @returns A HTTP request (Observable)
   */
  public listUpdateVisibility(uuid: string, newVisibility: number) {
    return this.commonApi.postJSONRequest(`/protected/list/${uuid}/visibility`, {
      new_visibility: newVisibility
    });
  }

  /**
   * Retrieve a single group or all groups in a given talking list.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid If just a single group shall be obtained, provide the group UUID.
   * @returns A HTTP request (Observable)
   */
  public groupGet(listUuid: string, groupUuid?: string) {
    if (groupUuid) {
      return this.commonApi.getRequest(`/public/list/${listUuid}/group/${groupUuid}`);
    }
    return this.commonApi.getRequest(`/public/list/${listUuid}/group`);
  }

  /**
   * Create a new group.
   *
   * @param listUuid UUID of the talking list to use
   * @param name Name of the group to be created
   * @returns A HTTP request (Observable)
   */
  public groupPost(listUuid: string, name: string) {
    return this.commonApi.postJSONRequest(`/protected/list/${listUuid}/group`, {
      name
    });
  }

  /**
   * Delete a group.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid UUID of the group to delete
   * @returns A HTTP request (Observable)
   */
  public groupDelete(listUuid: string, groupUuid: string) {
    return this.commonApi.deleteRequest(`/protected/list/${listUuid}/group/${groupUuid}`);
  }

  /**
   * Retrieve a single application or all applications in the given group.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid UUID of the group to use
   * @param applicationUuid If just a single application shall be obtained, provide the application UUID
   * @returns A HTTP request (Observable)
   */
  public applicationGet(listUuid: string, groupUuid: string, applicationUuid?: string) {
    if (applicationUuid) {
      return this.commonApi.getRequest(`/public/list/${listUuid}/group/${groupUuid}/application/${applicationUuid}`);
    }
    return this.commonApi.getRequest(`/public/list/${listUuid}/group/${groupUuid}/application`);
  }

  /**
   * Create a new application.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid UUID of the group to use
   * @param name Name of the applicant
   * @returns A HTTP request (Observable)
   */
  public applicationPost(listUuid: string, groupUuid: string, name: string) {
    return this.commonApi.postJSONRequest(`/public/list/${listUuid}/group/${groupUuid}/application`, {
      name
    });
  }

  /**
   * Delete an application.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid UUID of the group to use
   * @param applicationUuid UUID of the application to be deleted
   * @returns A HTTP request (Observable)
   */
  public applicationDelete(listUuid: string, groupUuid: string, applicationUuid: string) {
    return this.commonApi.deleteRequest(`/public/list/${listUuid}/group/${groupUuid}/application/${applicationUuid}`);
  }

  /**
   * Start a contribution.
   *
   * @param listUuid UUID of the talking list to use
   * @param groupUuid UUID of the group to use
   * @param applicationUuid UUID of the application to start
   * @returns A HTTP request (Observable)
   */
  public contributionStart(listUuid: string, groupUuid: string, applicationUuid: string) {
    return this.commonApi.getRequest(`/protected/list/${listUuid}/start_contribution?group=${groupUuid}&application=${applicationUuid}`);
  }

  /**
   * Stop the currently running contribution.
   *
   * @param listUuid UUID of the talking list to use
   * @returns A HTTP request (Observable)
   */
  public contributionStop(listUuid: string) {
    return this.commonApi.getRequest(`/protected/list/${listUuid}/stop_contribution`);
  }

  /**
   * Reset all past contributions and the time distribution.
   *
   * @param listUuid UUID of the talking list to use
   * @returns A HTTP request (Observable)
   */
  public contributionReset(listUuid: string) {
    return this.commonApi.getRequest(`/protected/list/${listUuid}/reset_past_contributions`);
  }

  /**
   * Get the time distribution between all current groups.
   *
   * @param listUuid UUID of the talking list to use
   * @returns A HTTP request (Observable)
   */
  public timeDistributionGet(listUuid: string) {
    return this.commonApi.getRequest(`/public/list/${listUuid}/time_distribution`);
  }

}
