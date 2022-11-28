const util = require("util");
const exec = util.promisify(require("child_process").exec);

const fs = require("fs");

var express = require("express");
var app = express();
app.use(express.json());

const PORT = 6000;

app.get("/loxJava", async function (req, res) {
  const output = await executeCommand(req.body.code);
  res.send(output);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

async function executeCommand(req) {
  console.log(req);
  fs.writeFileSync("./program.txt", req);
  try {
    const { stdout, stderr } = await exec("cd Slox/java && java com.slox.lox.Lox ../../program.txt");
    if (stderr) {
      //   console.log(`stderr: ${stderr}`);
      return stderr;
    }
    // console.log(`stdout: ${stdout}`);
    return stdout;
  } catch (error) {
    return error.message;
  }
}
