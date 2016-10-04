import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { ContactsModule } from './contacts.module';

export function main() {
   describe('Contacts component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ContactsModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let contactsDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(contactsDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-contacts></sd-contacts>'
})
class TestComponent {}
