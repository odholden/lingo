angular
  .module('logging')
  .controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User", "CurrentUser"]
function ProjectsController(Project, User, CurrentUser){
  var self = this;

  self.all     = [];
  self.users   = [];
  self.project = {}; 

  self.getProjects = function(){
    Project.query(function(data){
      return self.all = data;
    })
  }

  self.getUsers = function(){
     User.query(function(data){
      return self.users = data.users;
    });
  }

  self.add = function(){
    var project = { project: self.project }
    Project.save(project, function(data){
      self.all.push(data);
      self.project = {};
    })
  }

  self.getProjects();
  self.getUsers();

  console.log(CurrentUser.getUser());
}