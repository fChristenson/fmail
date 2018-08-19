const React = require("react");
const Dialog = require("@material-ui/core/Dialog").default;
const DialogTitle = require("@material-ui/core/DialogTitle").default;
const DialogContent = require("@material-ui/core/DialogContent").default;
const DialogActions = require("@material-ui/core/DialogActions").default;
const Button = require("@material-ui/core/Button").default;
const TextField = require("@material-ui/core/TextField").default;

const ComposeEmail = ({ open, onCancel, onSend }) => {
  return (
    <Dialog fullWidth scroll="paper" open={open} onClose={onCancel}>
      <DialogTitle>Compose email</DialogTitle>
      <form onSubmit={onSend}>
        <DialogContent>
          <TextField
            required
            name="recipients"
            className="compose-email__text-field"
            label="Recipients"
          />
          <TextField
            required
            name="subject"
            className="compose-email__text-field"
            label="Subject"
          />
          <TextField
            required
            name="message"
            className="compose-email__text-field--message"
            rows="6"
            fullWidth
            multiline
            label="Message"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

module.exports = ComposeEmail;
