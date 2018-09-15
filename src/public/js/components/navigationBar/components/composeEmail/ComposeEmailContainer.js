const ComposeEmail = require("./ComposeEmail");
const { connect } = require("react-redux");
const { ShowAlert } = require("../../../alert/alertActions");
const { SetEmails } = require("../../../inbox/inboxActions");
const { EMAIL_LIMIT } = require("../../../inbox/config");
const {
  ShowComposeEmail,
  ResetForm,
  SetFormField
} = require("../../../navigationBar/components/composeEmail/composeEmailActions");
const EmailOverview = require("../navigationList/EmailOverview");
const { SetEmailOverview } = require("../navigationList/navigationListActions");
const fetchEmails = require("../../../inbox/utils/fetchEmails")(window.fetch);
const timestampSort = require("../../../inbox/utils/timestampSort");
const InboxEmail = require("../../../inbox/utils/InboxEmail");
const Paths = require("../../../../config/paths");
const SendEmailRequest = require("./utils/SendEmailRequest");
const UpdateEmailRequest = require("./utils/UpdateEmailRequest");
const RemoveEmailRequest = require("./utils/RemoveEmailRequest");
const emailWasStarted = require("./utils/emailWasStarted");
const formFieldsChanged = require("./utils/formFieldChanged");

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname,
    open: state.composeEmail.show,
    originalForm: state.composeEmail.originalForm,
    form: state.composeEmail.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRecipientsChange: event => {
      dispatch(SetFormField("recipients", event.target.value));
    },
    onSubjectChange: event => {
      dispatch(SetFormField("subject", event.target.value));
    },
    onMessageChange: event => {
      dispatch(SetFormField("message", event.target.value));
    },
    async onCancel(originalForm, form, pathname) {
      const recipients = form.recipients;
      const subject = form.subject;
      const message = form.message;
      const emailType = form.emailType;
      const emailId = form.emailId;
      dispatch(ShowComposeEmail(false));
      dispatch(ResetForm());
      try {
        if (emailType === "draft" && formFieldsChanged(originalForm, form)) {
          const request = UpdateEmailRequest(recipients, subject, message);
          const response = await fetch(Paths.api.draftEmail(emailId), request);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error);
          }

          this.onDraftSent(pathname);
        } else if (emailType !== "draft" && emailWasStarted(form)) {
          const request = SendEmailRequest(recipients, subject, message);
          const offset = 0;
          const response = await fetch(
            Paths.api.draftsEmails(offset, EMAIL_LIMIT),
            request
          );
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error);
          }

          this.onDraftSent(pathname);
        }
      } catch (error) {
        const title = "Draft save failed";
        this.onError(title, error.message);
      }
    },
    async onSend(event, pathname, maybeDraftEmailId) {
      event.preventDefault();
      const recipients = event.target.recipients.value;
      const subject = event.target.subject.value;
      const message = event.target.message.value;
      const request = SendEmailRequest(recipients, subject, message);
      try {
        const response = await fetch(Paths.api.sendEmail, request);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error);
        } else {
          dispatch(ShowComposeEmail(false));
          dispatch(ResetForm());

          if (maybeDraftEmailId) {
            const request = RemoveEmailRequest();
            const response = await fetch(
              Paths.api.email(maybeDraftEmailId),
              request
            );

            if (!response.ok) {
              const json = await response.json();
              throw new Error(json.error);
            }
          }

          this.onEmailSent(pathname);
        }
      } catch (error) {
        dispatch(ShowComposeEmail(false));
        dispatch(ResetForm());
        const title = "Email failed";
        this.onError(title, error.message);
      }
    },
    onError: (title, errorMessage) => {
      return dispatch(ShowAlert(title, errorMessage));
    },
    onEmailSent: async pathname => {
      const title = "Email sent";
      const text = "Email was sent successfully";
      dispatch(ShowAlert(title, text));

      try {
        const response = await fetch(Paths.api.overview);
        const json = await response.json();
        dispatch(SetEmailOverview(EmailOverview(json)));

        if (Paths.sentMail === pathname || Paths.drafts === pathname) {
          const offset = 0;
          const response = await fetchEmails(pathname, offset, EMAIL_LIMIT);
          const json = await response.json();

          if (!response.ok) throw new Error(json.error);

          const sort = json.sort(timestampSort);
          const emails = sort.map(InboxEmail);
          return dispatch(SetEmails(emails));
        }
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    },
    onDraftSent: async pathname => {
      try {
        const response = await fetch(Paths.api.overview);
        const json = await response.json();
        dispatch(SetEmailOverview(EmailOverview(json)));

        if (Paths.drafts === pathname) {
          const offset = 0;
          const response = await fetchEmails(pathname, offset, EMAIL_LIMIT);
          const json = await response.json();

          if (!response.ok) throw new Error(json.error);

          const sort = json.sort(timestampSort);
          const emails = sort.map(InboxEmail);
          return dispatch(SetEmails(emails));
        }
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ComposeEmail);
