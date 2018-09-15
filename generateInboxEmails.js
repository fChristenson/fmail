const mongoose = require("mongoose");
const EmailModel = require("./src/lib/services/emailService/EmailModel");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/fmail", {
  useNewUrlParser: true
});

const promises = [];

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Fames ac turpis egestas maecenas pharetra convallis. Vitae congue mauris rhoncus aenean vel. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Nullam vehicula ipsum a arcu cursus vitae congue. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Viverra vitae congue eu consequat ac felis donec et. In vitae turpis massa sed elementum tempus egestas. Quam viverra orci sagittis eu volutpat odio. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Maecenas sed enim ut sem viverra aliquet eget sit. Ut venenatis tellus in metus vulputate eu. Sit amet purus gravida quis blandit turpis cursus in. Augue interdum velit euismod in pellentesque massa placerat. Turpis egestas integer eget aliquet nibh.

Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Odio facilisis mauris sit amet massa vitae tortor condimentum. Eget nunc scelerisque viverra mauris. Nunc non blandit massa enim nec. Vitae et leo duis ut diam quam nulla porttitor. Mauris pellentesque pulvinar pellentesque habitant morbi. Risus pretium quam vulputate dignissim suspendisse. Bibendum enim facilisis gravida neque convallis a cras. At consectetur lorem donec massa sapien faucibus. Ultricies integer quis auctor elit sed. Tristique senectus et netus et malesuada fames ac turpis egestas. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Ornare arcu dui vivamus arcu felis bibendum. Mauris cursus mattis molestie a. Volutpat diam ut venenatis tellus in. Odio euismod lacinia at quis risus sed. Eget mi proin sed libero enim sed faucibus.

Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Condimentum lacinia quis vel eros donec ac. Sed velit dignissim sodales ut eu sem. Malesuada proin libero nunc consequat. Nunc sed id semper risus in hendrerit. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Quis ipsum suspendisse ultrices gravida dictum. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Viverra orci sagittis eu volutpat. Dictum sit amet justo donec. Justo donec enim diam vulputate ut. Vitae aliquet nec ullamcorper sit. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Turpis egestas integer eget aliquet nibh praesent tristique magna sit.

Morbi non arcu risus quis. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Ultrices neque ornare aenean euismod elementum nisi. Id aliquet lectus proin nibh nisl. Sed blandit libero volutpat sed cras ornare arcu dui. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Ultricies mi eget mauris pharetra et ultrices. Vitae turpis massa sed elementum tempus egestas sed. Aliquet enim tortor at auctor urna nunc. Iaculis at erat pellentesque adipiscing commodo. Quis ipsum suspendisse ultrices gravida dictum. Sollicitudin aliquam ultrices sagittis orci. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Sit amet volutpat consequat mauris. Feugiat vivamus at augue eget arcu dictum varius duis at. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Elementum nibh tellus molestie nunc non blandit massa. Posuere morbi leo urna molestie at elementum eu facilisis.

Sed faucibus turpis in eu mi bibendum neque. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Auctor urna nunc id cursus metus aliquam. Egestas dui id ornare arcu odio ut sem. Eu augue ut lectus arcu. Ultrices eros in cursus turpis massa tincidunt dui. Dolor sit amet consectetur adipiscing. Facilisis magna etiam tempor orci eu lobortis. Ac felis donec et odio pellentesque diam volutpat commodo sed. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Erat nam at lectus urna duis convallis. In hendrerit gravida rutrum quisque non. Amet cursus sit amet dictum. Duis ut diam quam nulla porttitor massa id neque. Rhoncus mattis rhoncus urna neque viverra justo nec.`;

for (let i = 0; i < 30; i++) {
  const userId = process.argv[2];
  const recipients = ["me@fmail.com"];
  const subject = "This is a subject";
  const message = lorem;
  const type = "received";
  const email = new EmailModel({ userId, recipients, subject, message, type });
  promises.push(email.save());
}

Promise.all(promises).then(emails => {
  console.log(`Created ${emails.length} emails`);
  process.exit(0);
});
