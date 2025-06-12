import ProfileView from '../views/profileView.js';
import ProfilePresenter from '../presenters/profilePresenter.js';

const profilePage = {
  getElement() {
    if (!this.view) {
      this.view = new ProfileView();
      this.presenter = new ProfilePresenter(this.view);
    }
    return this.view.getElement();
  }
};

export default profilePage;