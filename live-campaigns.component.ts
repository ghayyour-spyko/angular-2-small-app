import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Campaign } from '../../repository/campaigns/dto/campaign';
import { RepositoryResult } from '../../repository/repository-result';
import { HttpResponse } from '@angular/common/http';
import { CampaignKpiService } from '../../repository/campaigns/campaign-kpi.service';
import { PreApprovalRedemptionGoalDto } from '../../repository/campaigns/dto/pre-approval-redemption-goal-dto';
import { PreApprovalLoanVolumeGoalDto } from '../../repository/campaigns/dto/pre-approval-loan-volume-goal-dto';
import { ShorthandNumberPipe } from '../../widget.module/number.module/shorthand-number.pipe';
import { XsellGoalDto } from '../../repository/campaigns/dto/xsell-goal-dto';

@Component({
  selector: 'app-live-campaigns',
  templateUrl: './live-campaigns.component.html',
  styleUrls: ['./live-campaigns.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LiveCampaignsComponent implements OnInit, OnChanges {
  @Input() campaigns: Campaign[];
  @Output() onCampaignSelected = new EventEmitter<Campaign>();

  public liveCampaigns: LiveCampaign[] = [];
  public now: Date;

  constructor(private kpiService: CampaignKpiService, @Inject(LOCALE_ID) private _locale: string) {
    this.now = new Date();
  }

  public createHeaderText( headerText: string): string  {
    if (!headerText) {
      return '';
    }

    return (headerText.length > 40 ? (headerText.slice(0, 40) + ' ...') : headerText);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.campaigns) {
      this.liveCampaigns.length = 0;

      const c = changes.campaigns.currentValue as Campaign[];

      c.forEach(value => {
        const liveCampaign = new LiveCampaign(value);
        this.liveCampaigns.push(liveCampaign);

        this.kpiService.getPreApprovalRedemptionGoal(value.fiId, value.id).subscribe(
          (r: HttpResponse<RepositoryResult<PreApprovalRedemptionGoalDto>>) => {
            liveCampaign.redemptionGoal = {
              current: r.body.data.redemptionPercentage,
              goal: r.body.data.goal
            };

            liveCampaign.redemptionGoalConfig.options.textInside = (r.body.data.redemptionPercentage * 100).toFixed(2) + '%';
          }
        );

        this.kpiService.getPreApprovalLoanVolumeGoal(value.fiId, value.id).subscribe(
          (r: HttpResponse<RepositoryResult<PreApprovalLoanVolumeGoalDto>>) => {
            liveCampaign.loanVolumeGoal = {
              current: r.body.data.currentValue,
              goal: r.body.data.goal
            };

            const pipe = new ShorthandNumberPipe(this._locale);
            liveCampaign.loanVolumeGoalConfig.options.textInside = '$' + pipe.transform(r.body.data.currentValue);
          }
        );

        this.kpiService.getXsellGoal(value.fiId, value.id).subscribe(
          (r: HttpResponse<RepositoryResult<XsellGoalDto>>) => {
            liveCampaign.xsellGoal = {
              current: r.body.data.currentValue,
              goal: r.body.data.goal
            };

            const pipe = new ShorthandNumberPipe(this._locale);
            liveCampaign.xsellGoalConfig.options.textInside = pipe.transform(r.body.data.currentValue);
          }
        );
      });
    }
  }
}



