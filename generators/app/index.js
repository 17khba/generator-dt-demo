var path = require("path");
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("project", {
      type: "String",
      required: false
    });
  }
  rompting() {
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

      this.log("project", this.project);
      this.log("author", this.author);
      this.log("description", this.description);
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath("./"),
      this.destinationPath("./"),
      {
        project: this.project,
        user: this.user,
        email: this.email,
        description: this.description
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
        createTime: new Date().toLocaleDateString()
      }
    );
  }
};
