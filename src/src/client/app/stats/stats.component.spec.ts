import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { StatsModule } from './stats.module';

export function main() {
   describe('Stats component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [StatsModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let statsDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(statsDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-stats></sd-stats>'
})
class TestComponent {}
