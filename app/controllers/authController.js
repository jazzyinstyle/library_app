

function AuthController() {
  const roles = [];
  const user = {};

  function setRoles(inRoles) {
    this.roles = inRoles;
  }

  function setUser(inUser) {
    this.user = inUser;
  }

  function isAuthorized(neededRole) {
    if (this.user) {
      return this.user.isAuthorized(neededRole);
    }
    // return (this.roles.indexOf(neededRole) >= 0);
  }

  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(() => {
      cb(this.roles.indexOf(neededRole) >= 0);
    }, 0);
  }

  function isAuthorizedPromise(neededRole, cb) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.roles.indexOf(neededRole) >= 0);
      }, 0);
    });
  }

  function getIndex(req, res) {
    if (req.user.isAuthorized('admin')) {
      return res.render('index');
    }
    res.render('error');
  }

  return {
    isAuthorized,
    isAuthorizedAsync,
    isAuthorizedPromise,
    setRoles,
    setUser,
    getIndex
  };
}

module.exports = AuthController();
