import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveCampaignsComponent } from './live-campaigns.component';
import {ChartsComponent} from '../charts/charts.component';
import {AccordionConfig, AccordionModule} from 'ngx-bootstrap';
import {DateDurationComponent} from '../../common/date-duration/date-duration.component';
import { CampaignKpiService } from '../../repository/campaigns/campaign-kpi.service';
import { HttpClient } from '@angular/common/http';

describe('LiveCampaignsComponent', () => {
  let component: LiveCampaignsComponent;
  let fixture: ComponentFixture<LiveCampaignsComponent>;

  beforeEach(async(() => {
    const accordionConfigStub = {
      closeOthers: true
    };

    TestBed.configureTestingModule({
      declarations: [
        LiveCampaignsComponent,
        ChartsComponent,
        DateDurationComponent
      ],
      providers: [
        {provide: AccordionConfig, useValue: accordionConfigStub},
        {provide: HttpClient, useValue: {} as HttpClient},
        CampaignKpiService
      ],
      imports: [
        AccordionModule
      ]
    })
   .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
