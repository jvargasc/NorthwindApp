import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { ConfirmService } from '../_services/confirm.service';
import { TerritoryEditComponent } from './territory-edit/territory-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<TerritoryEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.territoryForm?.dirty || component.savingRecord) {
    return confirmService.confirm();
  }

  return true;
};
