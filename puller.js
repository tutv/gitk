"use strict";
var Puller = (function () {
    /**
     * Constructor
     * @param shell
     */
    function Puller(shell) {
        this.shell = shell;
        this.setDir('.');
    }
    /**
     * Set dir local
     * @param dir
     * @returns {Puller}
     */
    Puller.prototype.setDir = function (dir) {
        this.dir = dir;
        return this;
    };
    /**
     * Set url git
     * @param url
     * @returns {Puller}
     */
    Puller.prototype.set_url = function (url) {
        if (url === void 0) { url = ''; }
        if (!url || url !== '') {
            return this;
        }
        this.git_url = url;
        return this;
    };
    /**
     * CD to dir local
     * @returns {boolean}
     */
    Puller.prototype.cdDir = function () {
        var _shell = this.shell.cd(this.dir);
        if (_shell.code === 0) {
            return true;
        }
        else {
            console.log('No such directory');
            return false;
        }
    };
    /**
     * Pull git
     * @param origin
     * @returns {any}
     */
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
    Puller.prototype.push = function (origin) {
        if (origin === void 0) { origin = 'wpengine master'; }
        var cd = this.cdDir();
        if (cd) {
            var _shell = this.shell.exec('git push -u ' + origin);
            if (_shell.code !== 0) {
                console.log('Push failed!');
            }
            else {
                console.log('Push success!');
            }
            return _shell;
        }
        return null;
    };
    return Puller;
}());
exports.Puller = Puller;
//# sourceMappingURL=puller.js.map