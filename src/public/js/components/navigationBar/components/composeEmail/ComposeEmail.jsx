const React = require("react");
const Dialog = require("@material-ui/core/Dialog").default;
const DialogTitle = require("@material-ui/core/DialogTitle").default;
const DialogContent = require("@material-ui/core/DialogContent").default;
const DialogActions = require("@material-ui/core/DialogActions").default;
const Button = require("@material-ui/core/Button").default;
const TextField = require("@material-ui/core/TextField").default;

class ComposeEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        data-test="compose-email"
        fullWidth
        scroll="paper"
        open={this.props.open}
        onClose={() =>
          this.props.onCancel(
            this.props.originalForm,
            this.props.form,
            this.props.pathname
          )}
      >
        <DialogTitle>Compose email</DialogTitle>
        <form
          onSubmit={event =>
            this.props.onSend(
              event,
              this.props.pathname,
              this.props.form.emailId
            )}
        >
          <DialogContent>
            <TextField
              required
              name="recipients"
              className="compose-email__text-field"
              label="Recipients"
              onChange={this.props.onRecipientsChange}
              value={this.props.form.recipients}
            />
            <TextField
              required
              name="subject"
              className="compose-email__text-field"
              label="Subject"
              onChange={this.props.onSubjectChange}
              value={this.props.form.subject}
            />
            <TextField
              required
              name="message"
              className="compose-email__text-field--message"
              rows="6"
              fullWidth
              multiline
              label="Message"
              onChange={this.props.onMessageChange}
              value={this.props.form.message}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              data-test="compose-email__cancel"
              onClick={() =>
                this.props.onCancel(
                  this.props.originalForm,
                  this.props.form,
                  this.props.pathname
                )}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-test="compose-email__send"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

module.exports = ComposeEmail;
