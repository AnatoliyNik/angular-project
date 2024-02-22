import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  it('should create', () => {
    const {searchDebugEl} = setup();

    expect(searchDebugEl.componentInstance).toBeTruthy();
  });

  it('should emmit search text after input, debounceTime 300ms', fakeAsync(() => {
    const {searchDebugEl, fixture} = setup();
    const searchText = 'mock search text';

    (searchDebugEl.componentInstance as SearchComponent).search.setValue(searchText);

    tick(300);

    expect(fixture.componentInstance.searchText).toBe(searchText);
  }));

  it('should not emmit search text if it shorter then 3 and longer then 0, debounceTime 300ms ', fakeAsync(() => {
    const {searchDebugEl, fixture} = setup();
    const searchText = 'ab';
    (searchDebugEl.componentInstance as SearchComponent).search.setValue(searchText);

    tick(300);

    expect(fixture.componentInstance.searchText).not.toBeDefined();
  }));

  it('should clear search input', () => {
    const {searchDebugEl} = setup();
    const searchComponent: SearchComponent = searchDebugEl.componentInstance;

    searchComponent.search.setValue('some value');
    searchComponent.clearSearch();

    expect(searchComponent.search.value).toBe('');
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [
      SearchComponent
    ],
    template: '<app-search (searchText)="searchText = $event"/>'
  })
  class HostSearchComponent {
    searchText!: string;
  }

  const fixture: ComponentFixture<HostSearchComponent> = TestBed.createComponent(HostSearchComponent);
  const searchDebugEl: DebugElement = fixture.debugElement.query(By.directive(SearchComponent));

  fixture.detectChanges();

  return {
    fixture,
    searchDebugEl
  };
}
