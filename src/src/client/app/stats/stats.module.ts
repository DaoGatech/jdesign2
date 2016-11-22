import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    imports: [CommonModule, FormsModule, ChartsModule],
    declarations: [StatsComponent],
    exports: [StatsComponent]
})

export class StatsModule { }
