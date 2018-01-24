var path = require("path");
var moment = require("moment");
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "project",
        message: "Your project name",
        default: this.appname
      },
      {
        type: "input",
        name: "author",
        message: "author name",
        default: "yourname"
      },
      {
        type: "input",
        name: "description",
        message: "项目说明",
        default: "新项目"
      }
    ]).then(answers => {
      this.project = answers.project || this.options.project;
      this.author = answers.author;
      this.description = answers.description;
      this.createTime = moment().format("YYYY-MM-DD");

      this.log("project", this.project);
      this.log("author", this.author);
      this.log("description", this.description);
      this.log("createTime", this.createTime);
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath("./"),
      this.destinationPath("./"),
      {
        project: this.project,
        author: this.author,
        description: this.description,
        createTime: this.createTime
      },
      {},
      {
        globOptions: {
          dot: true
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath("./readme.md"),
      this.destinationPath("./readme.md"),
      {
        project: this.project,
        author: this.author,
        description: this.description,
        createTime: this.createTime
      }
    );
  }
};
