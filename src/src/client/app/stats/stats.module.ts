import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule }    from '@angular/http';

@NgModule({
    imports: [CommonModule, FormsModule, ChartsModule, HttpModule],
    declarations: [StatsComponent],
    exports: [StatsComponent]
})

export class StatsModule { }
