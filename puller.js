"use strict";
var Puller = (function () {
    function Puller(shell) {
        this.shell = shell;
        this.setDir('.');
    }
    Puller.prototype.setDir = function (dir) {
        this.dir = dir;
        return this;
    };
    Puller.prototype.set_url = function (url) {
        if (url === void 0) { url = ''; }
        if (!url || url !== '') {
            return this;
        }
        this.git_url = url;
        return this;
    };
    Puller.prototype.cdDir = function () {
        var _shell = this.shell.exec('cd ' + this.dir);
        if (_shell.code === 0) {
            return true;
        }
        else {
            console.log('No such directory');
            return false;
        }
    };
    Puller.prototype.pull = function (origin) {
        if (origin === void 0) { origin = ''; }
        var cd = this.cdDir();
        if (cd) {
            var _shell = this.shell.exec('git pull ' + origin);
            if (_shell.code !== 0) {
                console.log('Pull failed!');
            }
            else {
                console.log('Pull success!');
            }
            return _shell;
        }
        return null;
    };
    return Puller;
}());
exports.Puller = Puller;
//# sourceMappingURL=puller.js.map