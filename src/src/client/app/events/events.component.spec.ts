import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { EventsModule } from './events.module';

export function main() {
   describe('Events component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [EventsModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let eventsDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(eventsDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-events></sd-events>'
})
class TestComponent {}
