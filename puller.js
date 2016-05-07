var puller = (function () {
    function puller(shell) {
        this.shell = shell;
        this.setDir('.');
    }
    puller.prototype.setDir = function (dir) {
        this.dir = dir;
    };
    puller.prototype.set_url = function (url) {
        if (url === void 0) { url = ''; }
        if (!url || url !== '') {
            return;
        }
        this.git_url = url;
    };
    puller.prototype.pull = function (origin) {
        if (origin === void 0) { origin = ''; }
        return this.shell.exec('git pull ' + origin);
    };
    return puller;
}());
//# sourceMappingURL=puller.js.map