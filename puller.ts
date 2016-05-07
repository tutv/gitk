export class Puller {
    shell;
    dir:string;
    git_url:string;
    username:string;
    password:string;

    public constructor(shell) {
        this.shell = shell;
        this.setDir('.');
    }

    public setDir(dir) {
        this.dir = dir;

        return this;
    }

    public set_url(url = '') {
        if (!url || url !== '') {
            return this;
        }

        this.git_url = url;
        return this;
    }

    public cdDir() {
        var _shell = this.shell.exec('cd ' + this.dir);
        if (_shell.code === 0) {
            return true;
        } else {
            console.log('No such directory');
            return false;
        }
    }

    public pull(origin = '') {
        var cd = this.cdDir();
        if (cd) {
            var _shell = this.shell.exec('git pull ' + origin);

            if (_shell.code !== 0) {
                console.log('Pull failed!');
            } else {
                console.log('Pull success!');
            }

            return _shell;
        }

        return null;
    }
}