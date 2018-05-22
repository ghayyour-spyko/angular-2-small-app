class LiveCampaign {
  public campaign: Campaign;
  public redemptionGoal: {
    goal: number,
    current: number
  };

  public redemptionGoalConfig = {
    options: {
      width: 300,
      height: 300,
      textInside: '',
      fontSize: '19px',
      colors: [ '#ebebeb', '#f7ce40']
    }
  };

  public loanVolumeGoal: {
    goal: number,
    current: number
  };

  public loanVolumeGoalConfig = {
    options: {
      width: 300,
      height: 300,
      textInside: '',
      fontSize: '19px',
      colors: ['#ebebeb' , '#f48301']
    }
  };

  public xsellGoal: {
    goal: number,
    current: number
  };

  public xsellGoalConfig = {
    options: {
      width: 300,
      height: 300,
      textInside: '',
      fontSize: '19px',
      colors: ['#ebebeb' , '#a8becc']
    }
  };

  public constructor(campaign: Campaign) {
    this.campaign = campaign;
  }
}
