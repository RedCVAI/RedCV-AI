import DashboardView from '../views/dashboardView.js';
import DashboardPresenter from '../presenters/dashboardPresenter.js';

const dashboardPage = {
  getElement() {
    const dashboardViewInstance = new DashboardView();

    const dashboardElement = dashboardViewInstance.getElement();

    const presenter = new DashboardPresenter(dashboardViewInstance);
    presenter.init();

    return dashboardElement;
  }
};

export default dashboardPage;