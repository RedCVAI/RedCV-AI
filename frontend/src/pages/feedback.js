import FeedbackView from "../views/feedbackView.js";
import FeedbackPresenter from "../presenters/feedbackPresenter.js";

const feedbackPage = {
  getElement() {
    const wrapper = document.createElement('div');

    const view = new FeedbackView();
    const presenter = new FeedbackPresenter(view);

    wrapper.appendChild(view.getElement());

    presenter.loadFeedbackData();
    presenter.bindEvents();

    return wrapper;
  }
};

export default feedbackPage;
