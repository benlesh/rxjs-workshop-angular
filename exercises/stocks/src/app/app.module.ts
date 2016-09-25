import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockLookupComponent } from './stock-lookup/stock-lookup.component';
import { StockComponent } from './stock/stock.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StockServerService } from './stock-server.service';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockLookupComponent,
    StockComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    StockServerService,
    WebSocketSubjectFactoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
