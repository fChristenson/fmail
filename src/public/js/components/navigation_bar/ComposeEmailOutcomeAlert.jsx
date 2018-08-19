const React = require("react");
const Alert = require("../alert/Alert");

const ComposeEmailOutcomeAlert = props => {
  const { errorAlertOpen, errorMessage, onErrorAlertClose } = props;
  const { successAlertOpen, onSuccessAlertClose } = props;
  return (
    <div>
      <Alert
        title="Email failed"
        text={errorMessage}
        open={errorAlertOpen}
        onClose={onErrorAlertClose}
      />
      <Alert
        title="Email was successfully sent"
        text="Your email has been sent!"
        open={successAlertOpen}
        onClose={onSuccessAlertClose}
      />
    </div>
  );
};

module.exports = ComposeEmailOutcomeAlert;
