import { TrainingDiaryPage } from './app.po';

describe('training-diary App', function() {
  let page: TrainingDiaryPage;

  beforeEach(() => {
    page = new TrainingDiaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
