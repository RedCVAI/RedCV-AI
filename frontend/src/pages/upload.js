import UploadView from "../views/uploadView.js";
import UploadPresenter from "../presenters/uploadPresenter.js";

const uploadView = new UploadView();
const uploadPresenter = new UploadPresenter(uploadView);

uploadView.bindFileChange(uploadPresenter.handleFileChange.bind(uploadPresenter));
uploadView.bindSubmit(uploadPresenter.handleSubmit.bind(uploadPresenter));

const uploadPage = {
  getElement() {
    return uploadView.getElement();
  }
};

export default uploadPage;
