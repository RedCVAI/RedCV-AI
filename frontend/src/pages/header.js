import HeaderView from '../views/headerView.js';
import HeaderPresenter from '../presenters/headerPresenter.js';

const headerPage = {
  getElement() {
    const view = new HeaderView();
    const presenter = new HeaderPresenter(view);
    presenter.loadUser();
    return view.getElement();
  }
};

export default headerPage;
